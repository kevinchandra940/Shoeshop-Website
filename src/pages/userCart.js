import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField
} from '@material-ui/core'

import { Login } from '../redux/action'

class UserCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dbCart: [],
            selectedID: null,
            alert: false
        }
    }

    handleDelete = (index) => {
        console.log(index)

        let tempCart = this.props.cart
        tempCart.splice(index, 1)

        // update data in database
        Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: tempCart })
            .then(res => {
                console.log(res.data)

                // update data redux
                Axios.get(`http://localhost:2000/users/${this.props.id}`)
                    .then(res => {
                        console.log(res.data)
                        this.props.Login(res.data)
                    })
            })
            .catch(err => console.log(err))
    }

    handleCheckOut = () => {
        console.log('check out')

        if (this.props.cart.length === 0) return

        this.setState({ alert: true })
    }

    handleClose = () => {
        this.setState({ alert: false })
    }

    handleOk = () => {
        console.log('user confirm')
        let history = {
            userID: this.props.id,
            date: new Date().toLocaleString(),
            total: this.props.cart.map(item => item.total).reduce((a, b) => a + b),
            products: this.props.cart
            
        }
        console.log(history)
        let tempPass = this.password.value

        if(tempPass === this.props.password){
            // update database
        Axios.post('http://localhost:2000/transaction_history', history)
        .then(res => {
            console.log(res.data)

            // update cart user => []
            Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: [] })
                .then(res => {
                    console.log(res.data)

                    // update data redux
                    Axios.get(`http://localhost:2000/users/${this.props.id}`)
                        .then(res => {
                            console.log(res.data)
                            this.props.Login(res.data)
                            this.setState ({alert:false})
                        })
                })
        })
        .catch(err => console.log(err))

        } else {alert('error bro')}

    
    }

    renderTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    renderTableBody = () => {
        return this.props.cart.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.total}</TableCell> 
                    <TableCell>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.handleDelete(index)}
                        >Delete</Button>

                        <Button variant="contained" color="primary" onClick={() => this.setState({ selectedID: item.id })}>
                            Edit
                            </Button>

                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        let count = 0
        this.props.cart.map((item, index) => {
            count += item.total
        })
        const { alert } = this.state
        console.log(this.props.cart)
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>User Cart</h1>
                <Table>
                    {this.renderTableHead()}
                    <TableBody>{this.renderTableBody()}</TableBody>
                </Table>
                <Button
                    variant="contained"
                    style={styles.buttonCheckOut}
                    onClick={this.handleCheckOut}
                >
                    Check Out
                </Button>
                <Dialog
                    open={alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"💳 Confirmation"}</DialogTitle>
                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                            Please confirm your password for additional checkout!
                    </DialogContentText>
                        <TextField
                         inputRef={password => this.password = password}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Confirm Password"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus>
                            OK
                    </Button>
                    </DialogActions >

                    <Dialog>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please confirm your password for additional checkout!
                    </DialogContentText>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                    </Button>
                                <Button onClick={this.handleOk} color="primary" autoFocus>
                                    OK
                    </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>

                </Dialog>
            </div>
        )
    }
}

const styles = {
    root: {
        height: 'calc(100vh - 70px)',
        backgroundColor: '#f2f2f2',
        padding: '90px 10% 3% 10%'
    },
    title: {
        margin: '2% 0px'
    },
    ul: {
        listStyle: 'none'
    },
    buttonCheckOut: {
        marginTop: '3%',
        color: 'white',
        backgroundColor: '#130f40'
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart,
        id: state.user.id,
        password : state.user.password

    }
}

export default connect(mapStateToProps, { Login })(UserCart)

