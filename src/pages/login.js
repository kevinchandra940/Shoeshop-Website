import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility'
import FormHelperText from '@material-ui/core/FormHelperText';
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Login } from '../redux/action'
import { connect } from 'react-redux'


// ini untuk nge desain
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),

    },

}));

//ini storage untuk fungsi
class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loginError: false,
            user: []
        }
    }
    // ini fungsi untuk mengisi sebuah storage
    handleLogin = () => {
        let username = this.username.value
        let password = this.password.value

        console.log(username)
        console.log(password)

        // get user data using login data
        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
            .then((res) => {


                if (res.data.length === 0) { // check error
                    this.setState({ loginError: true })
                } else {
                    // set local storage
                    localStorage.setItem('username', res.data[0].username)
                    this.props.Login(res.data[0])
                    this.setState({ loginError: false })
                    console.log(res.data)
                }
            })
            .catch((err) => console.log(err))
    }



    // export default function InputWithIcon() {
    //     const classes = useStyles();


    // bikin kondisi
    render() {
        const { visible, loginError, user } = this.state
        console.log(user)

        // redirect
        if (localStorage.getItem('username')) {
            return <Redirect to='/' />
        }

        // ini untuk komponen
        return (

            <div style={{
                background: "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
                height: "100vh",
                width: "100vw",
                display: "flex"
            }}>
                <div style={{ margin: "auto", width: "20%", padding: "2%", background: "#ffffff" }}>
                    <div style={{ textAlign: "center", color: "black", fontFamily: 'Roboto, sans-serif' }}><h1>Login</h1></div>
                    <FormControl>
                        <InputLabel htmlFor="input-with-icon-adornment">Login</InputLabel>
                        <Input
                            inputRef={username => this.username = username}
                            id="input-with-icon-adornment"
                            startAdornment={

                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField

                        id="input-with-icon-textfield"
                        label="Password"
                        inputRef={password => this.password = password}
                        type={visible ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <AccountCircle />
                                </InputAdornment>
                            ),

                            // ini untuk visibility password
                            endAdornment: (
                                <InputAdornment aria-label="toggle password visibility"
                                    edge="end"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => this.setState({ visible: !visible })}
                                >


                                    {visible ? <Visibility /> : <VisibilityOff />}
                                </InputAdornment>)
                        }}
                    />

                    <Button onClick={this.handleLogin} variant="contained" primary href="#contained-buttons" style={{ textAlign: "center", marginBottom: "10%", marginTop: "10%", display: "block" }}>
                        Login
                </Button>
                    {/* <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="With a grid" />
                        </Grid>
                    </Grid>
                </div> */}
                </div>
            </div>
        );
    }
}
export default connect(null, { Login })(LoginPage)