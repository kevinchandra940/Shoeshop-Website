import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Paper, IconButton, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, TextField, InputLabel } from '@material-ui/core'
import Slider from "react-slick"
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import Input from '@material-ui/core/Input';
import { Login } from '../redux/action'


class ProductDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            image: '',
            stock: 0,
            toLogin: false,
            selectedSize: null,
            total: 0,
            size: null,
            toCart: false,
            alert: false
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then(res => {
                console.log(res.data)
                this.setState({ product: res.data[0], image: res.data[0].images })
                console.log(res.data[0].images)

            })
            .catch(err => console.log(err))
    }

    

    handleAddToCart = () => {
        const { total, product, size } = this.state
        // console.log('handle add to cart')
        console.log(this.quantity.value)
        let qty = parseInt( this.quantity.value )   
        console.log(size)
        // check user input
        if (size === null || qty === 0) {
            this.setState({ alert: true })
            return
        }

        // check if user already sigin ?
        if (!this.props.id) {
            this.setState({ toLogin: true })
        } else {
            console.log('user already login')
            let cartData = {
                name: product.name,
                brand: product.brand,
                color: product.colour,
                size: size,
                qty: qty,
                total: qty * product.price
            }

            let tempCart = this.props.cart
            tempCart.push(cartData)

            // update user cart in database
            Axios.patch(`http://localhost:2000/users/${this.props.id}`, { cart: tempCart })
                .then(res => {
                    console.log(res.data)

                    // update data redux
                    Axios.get(`http://localhost:2000/users/${this.props.id}`)
                        .then(res => {
                            this.props.Login(res.data)
                            this.setState({ toCart: true })
                        })
                })
                .catch(err => console.log(err))
        }
    }
    handleClose = () => {
        this.setState({ alert: false })
    }



    renderItems = () => {
        return (this.state.image || []).map((item, index) => {
            return (
                <div key={index}>
                    <div style={{
                        backgroundImage: `url(${item})`,
                        ...styles.content
                    }}>
                    </div>
                </div>
            )
        })
    }

    render() {
        const { product, image, stock, toLogin, toCart, alert, selectedSize, size } = this.state
        console.log(size)
        console.log(this.props.location)
        console.log(this.props.location.search)

        console.log(image)

        if (toLogin) {
            return <Redirect to='/login' />
        } else if (toCart) {
            return <Redirect to='/cart' />
        }

        return (
            <div style={styles.root}>
                {/* <Paper elevation={3}  > */}
                <div style={styles.leftContent}>
                    <Slider {...settings} style={styles.slider}>
                        {this.renderItems()}
                    </Slider>
                </div>
                <div style={styles.rightContent}>
                    <h1 style={styles.info}>Name : {product.name}</h1>
                    <h1 style={styles.info}>Category : {product.category}</h1>
                    <h1 style={styles.info}>Brand : {product.brand}</h1>
                    <h1 style={styles.info}>Color : {product.colour}</h1>
                    <h1 style={styles.info}>Description : </h1>
                    <h1 style={styles.decs}>{product.description}</h1>
                    <h1 style={styles.info}>Size : </h1>
                    <div>
                        {
                            (product.stock ? product.stock : []).map((item, index) => {
                                return <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={() => this.setState({ stock: item.total, selectedSize: index, size: item.code })}
                                    style={{
                                        backgroundColor: selectedSize === index ? '#130f40' : '',
                                        color: selectedSize === index ? 'white' : 'black',
                                        ...styles.sizeButton
                                    }}
                                >{item.code}</Button>
                            })
                        }
                        <h5>{stock ? `stock = ${stock}` : ''}</h5>
                    </div>
                    <div>
                        <Button 
                        style={styles.buttonTambah}
                        onClick={() => this.quantity.value++}>
                            +</Button>

                        <Input onChange={{}} style={styles.input} inputRef={(quantity) => this.quantity = quantity}></Input>

                        <Button 
                        style={styles.buttonKurang}
                        onClick={() => this.quantity.value--}
                        >-</Button>
                    </div>

                    <Button style={styles.button} onClick={this.handleAddToCart}>Add to Cart</Button>
                </div>
                <Dialog
                    open={alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"⚠ Warning !"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please choose your size, look at the stock if its avaiable, and input total or quantity min = 1.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* </Paper> */}
            </div >
        )
    }
}

const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease",
    // fade : true,
    appendDots: dots => {
        return (
            <div style={styles.dots}>
                <ul>{dots}</ul>
            </div>
        )
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
}



const styles = {
    root: {
        height: 'calc(100vh - 70px)',
        backgroundColor: '#f2f2f2',
        padding: '120px 10% 3% 10%',
        display: 'flex',
        alignItems: 'center'
    },
    leftContent: {
        height: '100%',
        // width: '100%',
        flexBasis: '45%',
        display: 'flex',
        backgroundColor: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        zIndex: 5
    },
    rightContent: {
        height: '100%',
        flexBasis: '50%',
        backgroundColor: 'white',
        padding: '3%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    info: {
        fontSize: 22,
        marginBottom: '2%',
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    decs: {
        fontSize: 18,
        marginBottom: '2%',
        fontWeight: 400
    },

    input: {
        // margin: "auto",
        position: 'absolute',
        height: "11.5%",
        width: "10%",
        padding: "3%",
        background: "#ffffff",
        left: "24.5%",
        textAlign: "center"

    },

    buttonTambah: {
        position: 'absolute',
        top: '88.4%',
        // right: '40%',
        width: '18%',
        background: '#f2f2f2'
    },

    buttonKurang: {
        position: 'absolute',
        width: '18%',
        left: '35%',
        top: '88.4%',
        background: '#f2f2f2'
    },

    button: {
        backgroundColor: 'black',
        color: 'white',
        width: '30%',
        alignSelf: 'flex-end',
        marginTop: '5%',
        position: 'absolute',
        bottom: '5%'
    },
    slider: {
        height: '60vh',
        width: '30vw',
        backgroundColor: 'white',
        position: 'relative'
    },
    next: {
        position: 'absolute',
        right: '7%',
        top: '45%',
        zIndex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    prev: {
        position: 'absolute',
        left: '7%',
        top: '45%',
        zIndex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    dots: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        height: 30
    },
    content: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '55vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '4% 0px'
    },
    title: {
        fontSize: 64,
        color: 'white',
        textTransform: 'capitalize',
        marginBottom: 20
    }
}


function NextArrow(props) {
    const { onClick } = props
    return (
        <IconButton style={styles.next} onClick={onClick}>
            <NavigateNextIcon />
        </IconButton>
    )
}

function PrevArrow(props) {
    const { onClick } = props
    return (
        <IconButton style={styles.prev} onClick={onClick}>
            <NavigateBeforeIcon />
        </IconButton>
    )
}

const mapStateToProps = (state) => {
    console.log(state.user)
    return {
        id: state.user.id,
        cart: state.user.cart
    }
}

export default connect(mapStateToProps, { Login })(ProductDetails)