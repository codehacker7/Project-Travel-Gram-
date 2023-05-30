import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ThemeProvider } from '@material-ui/core/styles';
import configureStore from './store';
import { localLogin } from './store/slices/authSlice';
import Layout from './components/Layout';
import theme from './theme';
import Dashboard from './screens/Dashboard/Dashboard';
import ViewTrip from './screens/ViewTrip/ViewTrip';
import Login from './screens/Auth/LoginScreen';
import Register from './screens/Auth/RegisterScreen';
import EditProfile from './screens/EditProfile';
import NotFound from './screens/NotFound';
import '@fontsource/roboto';

const history = createBrowserHistory();
const store = configureStore(history);

/* 
  Any route that can only be accessed by logged in users should be passed through
  ProtectedRoute rather than the normal Route
*/
function ProtectedRoute({ Component, ...props }) {
  /* Try to get user from the store */
  let isLoggedIn =
    store.getState() &&
    store.getState().get('auth') &&
    store.getState().get('auth').user &&
    store.getState().get('auth').user.username;
  /* If user does not exist in store, try to get user data from local storage */
  if (!isLoggedIn && localStorage.getItem('user')) {
    store.dispatch(localLogin());
    return <Route {...props} render={() => <Component {...props} />} />;
  } else {
    return (
      /* If user is logged in, proceed with original component; otherwise redirect to login page */
      <Route
        {...props}
        render={() =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Router history={history}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/dashboard" Component={Dashboard} />
                <ProtectedRoute path="/trip/view/:id" Component={ViewTrip} />
                <ProtectedRoute exact path="/" Component={Dashboard} />
                <ProtectedRoute path="/profile" Component={EditProfile} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </Layout>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
