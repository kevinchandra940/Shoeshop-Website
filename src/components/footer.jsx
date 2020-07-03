import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub'

function Footer () {
    return (
        <div style={styles.root}>
            
            <h1 style={styles.copyright}>Copyright 2020 © Kevin Chandra</h1>
            <ul style={styles.ul}>
                <li style={styles.li}><FacebookIcon fontSize="small"/></li>
                <li style={styles.li}><InstagramIcon fontSize="small"/></li>
                <li style={styles.li}><TwitterIcon fontSize="small"/></li>
                <li style={styles.li}><GitHubIcon fontSize="small"/></li>
            </ul>
        </div>
    )
}

const styles = {
    root : {
        height : '70%',
        width : '100%',
        backgroundColor : 'black',
        padding : '2% 7%',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        // marginBottom : '10%'
    },
    copyright : {
        fontSize : 15,
        color : 'white',
        fontFamily:'Roboto, sans-serif'
    },
    ul : {
        textDecoration : 'none'
    },
    li : {
        display : 'inline-block',
        color : 'white',
        marginLeft : 15,
        cursor : 'pointer'
    }
}

export default Footer