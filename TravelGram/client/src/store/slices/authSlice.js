import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL } from '../../screens/Auth/fieldNames';

export const login = createAsyncThunk('user/login', async (params) => {
  const encoded = {
    username: params[ USERNAME ],
    password: Buffer.from(params[ PASSWORD ], 'base64')
  };
  const response = await axios.post('/user/login', { ...encoded })
    .then(({ data }) => {
      const user = data[ 0 ];
      return {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          id: user.id,
          username: user.username,
          trips: user.trips,
          icon: user.photo_id,
        },
        error: false
      };
    })
    .catch(error => {
      let msg = error.message || error;
      if (!encoded.username) msg = 'Username cannot be empty';
      else if (!params[ PASSWORD ]) msg = 'Password cannot be empty';
      else if (msg.toLowerCase().includes('cannot read property')) msg = 'A user with the provided credentials was not found';
      return { error: msg };
    });
  return response;
});

export const register = createAsyncThunk('user/register', async (params) => {
  const encoded = {
    username: params[ USERNAME ],
    email: params[ EMAIL ],
    password: Buffer.from(params[ PASSWORD ], 'base64'),
    first_name: params[ FIRST_NAME ],
    last_name: params[ LAST_NAME ]
  };
  const response = await axios.post('/user/register', { ...encoded })
    .then(({ data }) => {
      return {
        error: false,
        user: {
          first_name: params[ FIRST_NAME ],
          last_name: params[ LAST_NAME ],
          email: params[ EMAIL ],
          username: params[ USERNAME ],
          id: data.id
        }
      };
    })
    .catch(error => {
      let msg = error.message || error;
      if (!encoded.username || !encoded.email || !params[ PASSWORD ] || !encoded.first_name || !encoded.last_name) msg = 'All fields are required.';
      return { error: msg };
    });
  return response;
});

export const updateUser = createAsyncThunk('user/update', async (params) => {
  let encoded = {};
  if (params.password) {
    encoded[ 'password' ] = Buffer.from(params.password, 'base64');
  }
  const response = await axios.put('/user/update', { ...encoded, ...params })
    .then(({ data }) => {
      return {
        user: {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          icon: data.photo_id,
          id: data.id
        },
        error: false
      };
    })
    .catch(error => {
      return { error: error.message || error };
    });
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      first_name: null,
      last_name: null,
      username: null,
      email: null,
      phone: null,
      icon: null,
      id: null
    },
    message: null,
    isLoading: false
  },
  reducers: {
    logout: state => {
      state.user = {
        first_name: null,
        last_name: null,
        username: null,
        email: null,
        phone: null,
        icon: null,
        id: null
      };
      state.isLoading = false;
      state.message = null;
      localStorage.clear();
      return state;
    },
    localLogin: state => {
      state.user = JSON.parse(localStorage.getItem('user'));
      state.isLoading = false;
      state.message = null;
      return state;
    }
  },
  extraReducers: {
    [ login.pending ]: state => {
      state.isLoading = true;
      state.message = null;
      return state;
    },
    [ login.fulfilled ]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.error) {
        state.message = payload.error;
        alert(payload.error);
      } else {
        state.user = payload.user;
        state.message = null;
        localStorage.setItem('user', JSON.stringify(payload.user));
      }
      return state;
    },
    [ login.rejected ]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.error;
      alert(payload.error);
      return state;
    },
    [ register.pending ]: state => {
      state.isLoading = true;
      state.message = null;
      return state;
    },
    [ register.fulfilled ]: (state, { payload }) => {
      if (payload.error) {
        state.message = payload.error;
        alert(payload.error);
      } else {
        state.user = payload.user;
        state.message = null;
        localStorage.setItem('user', JSON.stringify(payload.user));
      }
      return state;
    },
    [ register.rejected ]: (state, { payload }) => {
      state.message = payload.error;
      alert(payload.error);
      return state;
    },
    [ updateUser.pending ]: state => {
      state.isLoading = true;
      state.message = null;
      return state;
    },
    [ updateUser.fulfilled ]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.error) {
        state.message = payload.error;
        alert(payload.error);
      } else {
        state.user = { ...state.user, ...payload.user };
        state.message = null;
        localStorage.setItem('user', JSON.stringify(payload.user));
      }
      return state;
    },
    [ updateUser.rejected ]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.error;
      alert(payload.error);
      return state;
    },
  }
});

export const { logout, localLogin } = authSlice.actions;

export default authSlice.reducer;
