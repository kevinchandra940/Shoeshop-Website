import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    Popover,
    Paper,
    Menu,
    Divider,
    MenuItem,
    Card,
    Button
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { LOGO } from '../assets'
import Profile from './profile'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'



class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            open: false,
            logOutError: false
        }
    }

    handlePopoverOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget, open: !this.state.open })
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null, open: false })
    };

    renderPopOver = () => {
        return (
            <Popover
                id="mouse-over-popover"
                style={styles.popover}
                open={Boolean(this.state.anchorEl)}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    
                }}
                onClose={this.handlePopoverClose}
                disableRestoreFocus
            >
                <h3 style={{ textAlign: 'center'}}
                 >Cart({this.props.cart.length})</h3>
                <Divider />
                {(this.props.cart).map(item => {
                    return (
                        <div style={styles.cartPopOver}>
                            <div style={{ margin: 'auto'}}>
                                <MenuItem>
                                    <img src={item.images[0]} width='100px' />
                                </MenuItem>
                            </div>
                            <div>
                                <MenuItem>{item.name}</MenuItem>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <MenuItem>Rp. {item.total.toLocaleString()}</MenuItem>
                                    <MenuItem>Qty : {item.qty}</MenuItem>
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <Button style={{left:'32%'}}>
                                    <Link to={'/cart'}>
                                    Go to cart
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </Popover>
        )
    }
    render() {
        let count = 0
        this.props.cart.map((item) => {
            count += item.total
        })
        return (
            <AppBar position="fixed" style={styles.root} elevation={0}>
                <Toolbar style={styles.toolbar}>
                    <div style={styles.leftContent}>
                        <Link to="/">
                            <img src={LOGO} alt="logo" style={{ height: "60px" }} />
                        </Link>
                    </div>
                    <div style={styles.leftContent}>
                        <h1 style={styles.home}>Men</h1>
                    </div>

                    <div style={styles.leftContent}>
                        <h1 style={styles.home}>Women</h1>
                    </div>

                    <div style={styles.leftContent}>
                        <h1 style={styles.home}>Kids</h1>
                    </div>

                    <div style={styles.leftContent}>
                        <Link to="/products">
                            <h1 style={styles.home}>Products</h1>
                        </Link>
                    </div>

                    <div style={styles.rightContent}>
                        <div style={styles.cart}>
                            {/* <Link to="/cart"> */}
                                <IconButton onClick={(e) => this.handlePopoverOpen(e)}>
                                    <Badge badgeContent={this.props.cart.length} color="primary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                {this.renderPopOver()}
                            {/* </Link> */}
                            <h6 style={styles.cartTotal}>Rp. {count.toLocaleString()}</h6>
                        </div>
                        <Profile />

                        <div style={styles.leftContent}>
                            <h1 style={styles.home}>🇮🇩 </h1>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

        )
    }
}

const styles = {
    root: {
        height: 90,
        padding: '2% 7%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 39, 46, 0.3)'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0
    },

    // RightContent: {
    //     height: '100%',
    //     flexBasis: '10%',
    //     maxWidth: '10%',
    //     // backgroundColor : 'yellow',
    //     display: 'flex',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center'
    // },

    leftContent: {
        height: '100%',
        flexBasis: '0%',
        maxWidth: '10%',
        // backgroundColor : 'yellow',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    home: {
        paddingLeft: '3%',
        fontSize: 20,
        cursor: 'pointer',
        fontColour: 'white'
    },
    rightContent: {
        height: '100%',
        flexBasis: '50%',
        // backgroundColor : 'pink',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // cursor: 'pointer'
    },
    cart: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        marginRight: 15,
        cursor: 'pointer'
    },
    cartTotal: {
        fontSize: 16,
        marginLeft: 15
    },
    popover: {
        width: '500px'
    },
    cartPopOver: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        // background: "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
    }
}


const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        cart: state.user.cart
    }
}
export default connect(mapStateToProps)(Navbar);

