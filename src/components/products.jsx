import React from 'react'
import Axios from 'axios'
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardActions,
    CardContent,
    Button
} from '@material-ui/core'
import {Link} from 'react-router-dom'

class Products extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            products : []
        }
    }

    componentDidMount () {
        Axios.get('http://localhost:2000/products')
        .then(res => {
            console.log(res.data)
            this.setState({products : res.data})
        })
        .catch(err => console.log(err))
    }

    // handleAddToCart = () => {
    //     console.log('handle add to cart')

    //     // check if user already sigin ?
    //     if (!this.props.id) {
    //         this.setState({toLogin : true})
    //     } else {
    //         console.log('user already login')
    //     }
    // }

    renderCard = () => {


        return this.state.products.map((item, index) => {
            return (
                <Card style={styles.card}>
                    <CardActionArea style={styles.contentArea}>
                        <CardMedia image={item.images[0]} component="img" style={styles.contentImage}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`Rp ${item.price}, 00`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={styles.contentActions}>
                        <Link to={`/Productdetails?id=${item.id}`}>
                        <Button size="small" color="primary">
                            Buy Now
                        </Button>
                        </Link>
                        <Button size="small" color="secondary">
                            Wish List
                        </Button>
                    </CardActions>
                </Card>
            )
        })
    }

    render () {
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>Products</h1>
                <div style={styles.cardContainer}>
                    {this.renderCard()}
                </div>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'auto',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '2% 7%'
    },
    title : {
        fontSize : 50,
        fontWight : 600,
        margin : '2% 0px'
    },
    cardContainer : {
        width : '100%',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'flex-start'
    },
    card : {
        flexBasis : '19%',
        minWidth : '300px',
        marginBottom : '1%',
        marginRight : '1%'
    },
    contentArea : {
        height : '87%',
        padding : '1%'
    },
    contentImage : {
        width : '100%',
        padding : '5%'
    },
    contentActions : {
        height : '13%',
        alignItems : 'center'
    }
}

export default Products