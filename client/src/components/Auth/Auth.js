import React, {useState} from 'react'
import {Avatar, Button, Grid, Paper, Typography, Container} from '@material-ui/core'
import useStyles from './style'
import { FaLock } from 'react-icons/fa'
import Input from './Input'
import Icon from './icon'
import {GoogleLogin} from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {signin, signup} from '../../actions/auth'

const initialStae = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialStae)
    
    const handleSubmit = (e) => {
        e.preventDefault() 

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }

        console.log(formData)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((isSignup) => !isSignup)
        setShowPassword(false)
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data:{ result, token } })

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('Google sign in was unsuccessful. Try again later')
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <FaLock></FaLock>
                </Avatar>
                <Typography variant="h5">
                    { isSignup ? 'Sign up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input 
                                        name="firstName" 
                                        label="First Name" 
                                        handleChange={handleChange} 
                                        half />
                                    <Input 
                                        name="lastName" 
                                        label="Last Name" 
                                        handleChange={handleChange} 
                                        half />
                                </>
                            )
                        }
                        <Input 
                            name="email" 
                            label="Email Address" 
                            handleChange={handleChange} 
                            type='email' />
                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword} />
                        { 
                            isSignup && 
                            <Input 
                                name="confirmPassword" 
                                label="Repeat Password" 
                                handleChange={handleChange} 
                                type='password'
                                />
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="749687150432-vp18a6hmcjfi06jfc8mcn620oj1ji3fo.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />}
                            variant="contained" >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an Account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
