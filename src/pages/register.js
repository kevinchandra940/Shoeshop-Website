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
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';



const styles = {
    margin: {
        margin: "8px",

    },
    formControl: {
        margin: "8px",
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: "16px",
    },
    backgroundColour: {
        background: "red",
    },
};



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
            numb : true, 
            special : true,
            min : true,
            match : false,
            password : '',
            redirect : false,
            errorUsername : false
        }
    }

    handleRegister = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let confPassword = this.confPassword.value
        // let role = this.role.value


        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confPassword)
        // console.log(age)
        // console.log(region)

        // get user data using login data

        if (username === '' || email === '' || password === '' || confPassword === '') return

        // check password and confirm password 
        if (password !== confPassword) {
            return this.setState({ match: true })
        }

        Axios.get(`http://localhost:2000/users?username=${username}`)
        .then(res => {
            if(res.data.length !== 0) { // username already used
                this.setState({errorUsername : true})
            } else {
                // post data
                Axios.post('http://localhost:2000/users', {username, email, password, role : 'user', cart : []})
                .then(res => {
                    console.log(res.data)
                    this.setState({redirect : true})
                })
                .catch(err => console.log(err))
            }
        })
    }

    handlePassword = (e) => {
        // console.log(e.target.value)
        let password = e.target.value
        
        // password validation
        let number = /[0-9]/
        let specialChar = /[!@#$%^&*;]/

        // test password
        let testNumber = number.test(password)
        let testSpecial = specialChar.test(password)
        let testMin = password.length >= 6


        //  includes number
        if (testNumber) {
            this.setState({numb : false})
        } else {
            this.setState({numb : true})
        }

        // include spceial character
        if (testSpecial) {
            this.setState({special : false})
        } else {
            this.setState({special : true})
        }

        if (testMin) {
            this.setState({min : false})
        } else {
            this.setState({min : true})
        }

        this.setState({password : e.target.value})

    }






    // export default function InputWithIcon() {
    //     const classes = useStyles();

    render() {
        const { visible, numb, special, min, match, redirect, errorUsername } = this.state

        if (redirect) {
            return <Redirect to='/login'/>
        }

        return (

            <div style={{ height: "100vh", width: "100vw", display: "flex", background: "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)" }}>
                <div style={{ margin: "auto", top: "200px", width: "25%", padding: "2%", marginTop: "8%", background: "#f5f6fa" }}>
                    <div style={{ textAlign: "center", color: "black", fontFamily: 'Roboto, sans-serif' }}><h1>Register</h1></div>
                    <FormControl style={styles.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                        <Input
                            inputRef={(username) => this.username = username}
                            id="input-with-icon-adornment"
                            startAdornment={

                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField
                        style={styles.margin}
                        inputRef={(email) => this.email = email}
                        id="input-with-icon-textfield"
                        label="Email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <TextField
                        style={styles.margin}
                        inputRef={email  => this.email=email}
                        id="input-with-icon-textfield"
                        label="Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                    <TextField
                        style={styles.margin}
                        inputRef={(password) => this.password = password}
                        id="input-with-icon-textfield"
                        label="Password"
                        type={visible ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
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

                    <TextField
                        style={styles.margin}
                        inputRef={(confPassword) => this.confPassword = confPassword}
                        id="input-with-icon-textfield"
                        label="Confirm Password"
                        type={visible ? "text" : "confPassword"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
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

                    {/* <FormControl style={styles.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        inputRef={age  => this.age=age}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={10}>18</MenuItem>
                            <MenuItem value={20}>19</MenuItem>
                            <MenuItem value={30}>20</MenuItem>
                            <MenuItem value={30}>21</MenuItem>
                            <MenuItem value={30}>22</MenuItem>
                            <MenuItem value={30}>23</MenuItem>
                            <MenuItem value={30}>24</MenuItem>
                            <MenuItem value={30}>25</MenuItem>
                            <MenuItem value={30}>26</MenuItem>
                            <MenuItem value={30}>27</MenuItem>
                            <MenuItem value={30}>28</MenuItem>
                            <MenuItem value={30}>29</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={30}>31</MenuItem>
                            <MenuItem value={30}>32</MenuItem>
                            <MenuItem value={30}>34</MenuItem>
                            <MenuItem value={30}>35</MenuItem>
                            <MenuItem value={30}>36</MenuItem>
                            <MenuItem value={30}>37</MenuItem>
                            <MenuItem value={30}>38</MenuItem>
                            <MenuItem value={30}>39</MenuItem>
                            <MenuItem value={30}>40</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={styles.formControl}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                        inputRef={region => this.region=region}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={10}>Africa</MenuItem>
                            <MenuItem value={20}>Albania</MenuItem>
                            <MenuItem value={20}>Belgium</MenuItem>
                            <MenuItem value={20}>Cameroon</MenuItem>
                            <MenuItem value={20}>United States</MenuItem>
                            <MenuItem value={20}>Denmark</MenuItem>
                            <MenuItem value={20}>Hong Kong</MenuItem>
                            <MenuItem value={20}>Indonesia</MenuItem>
                            <MenuItem value={20}>Australia</MenuItem>
                            <MenuItem value={20}>New Zealand</MenuItem>

                        </Select>
                    </FormControl> */}


                    <FormControl component="fieldset" style={{ marginBottom: "10%", marginTop: "10%" }}>
                   <h1 style={{marginBottom: '10%', fontSize:'60%'}}>* password must min 6 character</h1>
                   <h1 style={{marginBottom: '10%', fontSize:'60%'}}>* includes number</h1>
                   <h1 style={{marginBottom: '10%', fontSize:'60%'}}>* includes special character</h1>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel

                                value="end"
                                control={<Checkbox color="primary" />}
                                label="By signing up, you agree to Kevin's Privacy Policy and Terms of Use."
                                labelPlacement="end"

                            />
                        </FormGroup>

                    </FormControl>

                    <Button onClick={this.handleRegister} variant="contained" Primary href="#contained-buttons" style={{ textAlign: "center", display: "block" }} >
                        Sign Up
                </Button>

                    <div>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>

                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div >
        );
    }
}
export default Register









//----------------------------------------------------------------------------------

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Visibility from '@material-ui/icons/Visibility'


// const useStyles = makeStyles((theme) => ({
//     margin: {
//         margin: theme.spacing(1),

//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },
//     backgroundColour: {
//         background: "red",
//     },
// }));

// export default function InputWithIcon() {
//     const classes = useStyles();
//     const [age, setAge] = React.useState('');

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };



//     return (

//         <div style={{ height: "100vh", width: "100vw", display:"flex", background: "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)" }}>
//             <div style={{ margin: "auto", top: "200px", width: "25%", padding: "2%", marginTop: "8%", background: "#f5f6fa" }}>
//                <div style={{textAlign:"center", color:"black",fontFamily:'Roboto, sans-serif'}}><h1>Register</h1></div>
//                 <FormControl className={classes.margin}>
//                     <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
//                     <Input
//                         id="input-with-icon-adornment"
//                         startAdornment={

//                             <InputAdornment position="start">
//                                 <AccountCircle />
//                             </InputAdornment>
//                         }
//                     />
//                 </FormControl>
//                 <TextField
//                     className={classes.margin}
//                     id="input-with-icon-textfield"
//                     label="Last Name"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <AccountCircle />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//                 <TextField
//                     className={classes.margin}
//                     id="input-with-icon-textfield"
//                     label="Your Email"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <AccountCircle />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//                 <TextField
//                     className={classes.margin}
//                     id="input-with-icon-textfield"
//                     label="Password"
//                     type={visible ? "text" : "password"}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <AccountCircle />
//                             </InputAdornment>
//                         ),
//                         endAdornment:(
//                             <InputAdornment  aria-label="toggle password visibility"
//                             edge="end"
//                             style={{cursor:"pointer"}}
//                             onClick={() => this.setState({visible : !visible})}
//                             >


//                         { visible ? <Visibility/> : <VisibilityOff/>}
//                         </InputAdornment>)
//                     }}
//                 />
//                 <FormControl className={classes.formControl}>
//                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={age}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value={10}>18</MenuItem>
//                         <MenuItem value={20}>19</MenuItem>
//                         <MenuItem value={30}>20</MenuItem>
//                         <MenuItem value={30}>21</MenuItem>
//                         <MenuItem value={30}>22</MenuItem>
//                         <MenuItem value={30}>23</MenuItem>
//                         <MenuItem value={30}>24</MenuItem>
//                         <MenuItem value={30}>25</MenuItem>
//                         <MenuItem value={30}>26</MenuItem>
//                         <MenuItem value={30}>27</MenuItem>
//                         <MenuItem value={30}>28</MenuItem>
//                         <MenuItem value={30}>29</MenuItem>
//                         <MenuItem value={30}>30</MenuItem>
//                         <MenuItem value={30}>31</MenuItem>
//                         <MenuItem value={30}>32</MenuItem>
//                         <MenuItem value={30}>34</MenuItem>
//                         <MenuItem value={30}>35</MenuItem>
//                         <MenuItem value={30}>36</MenuItem>
//                         <MenuItem value={30}>37</MenuItem>
//                         <MenuItem value={30}>38</MenuItem>
//                         <MenuItem value={30}>39</MenuItem>
//                         <MenuItem value={30}>40</MenuItem>
//                     </Select>
//                 </FormControl>

//                 <FormControl className={classes.formControl}>
//                     <InputLabel id="demo-simple-select-label">Region</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={age}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value={10}>Africa</MenuItem>
//                         <MenuItem value={20}>Albania</MenuItem>
//                         <MenuItem value={20}>Belgium</MenuItem>
//                         <MenuItem value={20}>Cameroon</MenuItem>
//                         <MenuItem value={20}>United States</MenuItem>
//                         <MenuItem value={20}>Denmark</MenuItem>
//                         <MenuItem value={20}>Hong Kong</MenuItem>
//                         <MenuItem value={20}>Indonesia</MenuItem>
//                         <MenuItem value={20}>Australia</MenuItem>
//                         <MenuItem value={20}>New Zealand</MenuItem>

//                     </Select>
//                 </FormControl>

//                 <FormControl component="fieldset" style={{marginBottom:"10%", marginTop:"10%"}}>
//                     <FormGroup aria-label="position" row>
//                         <FormControlLabel

//                             value="end"
//                             control={<Checkbox color="primary" />}
//                             label="By signing up, you agree to Kevin's Privacy Policy and Terms of Use."
//                             labelPlacement="end"
//                         />
//                     </FormGroup>

//                 </FormControl>

//                 <Button variant="contained" Primary href="#contained-buttons" style={{textAlign:"center", display:"block"}} >
//                     Sign Up
//                 </Button>

//                 {/* <div className={classes.margin}>
//                     <Grid container spacing={1} alignItems="flex-end">
//                         <Grid item>
//                             <AccountCircle />
//                         </Grid>
//                         <Grid item>
//                             <TextField id="input-with-icon-grid" label="email" />
//                         </Grid>
//                     </Grid>
//                 </div> */}
//             </div>
//         </div >
//     );
// }

//-----------------------------------------------------------------------------------


























