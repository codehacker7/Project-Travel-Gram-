import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardActions, Typography } from '@material-ui/core';
import AuthForm from '../../components/AuthForm';
import { login } from '../../store/slices/authSlice';
import { makeStyles } from '@material-ui/core/styles';
import { USERNAME, PASSWORD } from './fieldNames';
import theme from '../../theme';

const useStyles = makeStyles({
	loginRoot: {
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'radial-gradient(at top left, ' + theme.palette.primary.dark + ', transparent 60%), ' +
			'radial-gradient(at top right, ' + theme.palette.primary.main + ', transparent 70%), ' +
			'radial-gradient(at bottom left, ' + theme.palette.secondary.main + ', transparent 70%), ' +
			'radial-gradient(at bottom right, ' + theme.palette.secondary.dark + ', transparent 90%)'
	},
	card: {
		minWidth: '20%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.defaults.padding,
		boxShadow: theme.defaults.boxShadow,
		borderRadius: theme.defaults.borderRadius,
		backgroundColor: theme.palette.background
	},
	switchDiv: {
		marginTop: '5%'
	},
	switchText: {
		color: theme.palette.white,
	},
	switchLink: {
		color: theme.palette.secondary.main,
		textDecoration: 'none',
		'&:hover': {
			color: theme.palette.secondary.dark
		}
	}
});

function Login() {
	const [ fields, updateFields ] = useState({
		[ USERNAME ]: '',
		[ PASSWORD ]: '',
	});
	const dispatch = useDispatch();
	const classes = useStyles();

	return (
		<div className={classes.loginRoot}>
			<Card className={classes.card}>
				<AuthForm
					buttonText="Login"
					fields={fields}
					onChange={(event) => updateFields({ ...fields, ...event })}
					onSubmit={() => dispatch(login(fields)).then(() => window.location = '/').catch(err => alert(err))}
				/>
				<CardActions className={classes.switchDiv}>
					<Typography className={classes.switchText}>
						New to TravelGram?
					</Typography>
					<Typography className={classes.switchText}>
						<Link to="/register" className={classes.switchLink}>
							Sign up!
						</Link>
					</Typography>

				</CardActions>
			</Card>
		</div>
	);
}

export default Login;
