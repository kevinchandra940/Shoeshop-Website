import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core'

class Wishlist extends React.Component {




    render () {
        return (


            


            <div style={styles.root}>
                <h1 style={styles.title}>Your Wishlist</h1>

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
                
                <Link to='/' style={styles.link}>
                    <Button style={{ textAlign: "center", marginBottom: "10%", marginTop: "10%", display: "block"}}>Back to Home</Button>
                </Link>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'calc(100vh - 70px)',
        width : '100%',
        padding : '90px 10% 3% 10%',
        backgroundColor : '#f2f2f2',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        fontSize : 100,
        marginBottom : '3%'
    },
    link : {
        marginTop : '2%',
        textDecoration : 'none'
    }
}

export default Wishlist