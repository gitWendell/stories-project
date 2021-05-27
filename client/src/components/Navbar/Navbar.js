import React, {useState, useEffect} from 'react'
import {AppBar, Toolbar, Avatar, Typography, Button} from '@material-ui/core'
import useStyles from './style'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    console.log(user)

    const logout = () => {
        dispatch({ type:'LOGOUT' })

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                toast.error('Token expired. Please refresh and sign in.')

                logout()
            } 
        }
         
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography 
                    component={Link} 
                    to="/" 
                    className={classes.heading} 
                    variant='h2' 
                    align='center'>
                    Stories
                </Typography>          
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar 
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography
                            className={classes.userName}
                            variant="h6">
                        {user.result.name}
                        </Typography>
                        <Button 
                            variant="contained"
                            className={classes.logout}
                            onClick={logout}
                            color="secondary">
                        Logout
                        </Button>
                    </div>
                ) : (
                    <Button 
                        className={classes.buttton}
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary">
                    Sign in

                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
