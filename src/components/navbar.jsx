import React from 'react'
import {
    AppBar,
    Toolbar
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { LOGO } from '../assets'
import Profile from './profile'
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
    render() {
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
                            <ShoppingCartIcon />
                            <h6 style={styles.cartTotal}>Rp. 6.573.749.000</h6>
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
        fontColour : 'white'
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
    }
}

export default Navbar