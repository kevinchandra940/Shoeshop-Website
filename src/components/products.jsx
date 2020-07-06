import React from 'react'
import Axios from 'axios'
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardActions,
    CardContent,
    Button,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Box,

} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Rating from "@material-ui/lab/Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            category: "",
            price: "",
            rate: 0,
            start:0,
        }
    }


    // //   componentDidMount() {
    // //     this.getProductData("");
    // //   }
    //   getProductData = (input) => {
    //     Axios.get(`http://localhost:2000/products?q=${input}`)
    //       .then((res) => this.props.getProduct(res.data))
    //       .catch((err) => console.log(err));
    //   };

    buttonRating = (index, i) => {
        let idProduct = this.state.data[index].products[i].id
        console.log(this.props.product)
        console.log(index, i);
        console.log(idProduct)
        this.setState({ alert: true, idProduct: idProduct });
    }

    handleRating = (newvalue) => {
        console.log(newvalue)
        this.setState({ rate: newvalue })
    }

    handleCategory = (event) => {
        console.log(event.target.value);
        let cat = event.target.value;
        this.setState({ category: cat });
        Axios.get(`http://localhost:2000/products?q=${event.target.value}`)
            .then((res) => this.setState({ data: res.data }))
            .catch((err) => console.log(err));
    };
    handleSearch = () => {
        let searchInput = this.search.value;
        this.getProductData(searchInput);
    };
    handlePrice = (event) => {
        console.log(event.target.value);
        let sortPrice = event.target.value;
        let searchInput = this.search.value;
        this.setState({ price: sortPrice });
        Axios.get(
            `http://localhost:2000/products?q=${searchInput}&_sort=price&_order=${sortPrice}`
        )
            .then((res) => this.props.getProduct(res.data))
            .catch((err) => console.log(err));
    };


    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data })
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


        return this.state.products.map((item, index, rate) => {
            return (




                <Card style={styles.card}>
                    <CardActionArea style={styles.contentArea}>
                        <CardMedia image={item.images[0]} component="img" style={styles.contentImage} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`Rp ${item.price}, 00`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Box
                        // component="fieldset"
                        // mb={3}
                        // borderColor="transparent"
                    >
                        <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newvalue) =>
                                this.handleRating(newvalue)
                            }
                        />
                    </Box>
                    <CardActions style={styles.contentActions}>
                        <Link to={`/Productdetails?id=${item.id}`}>
                            <Button size="small" color="primary">
                                Buy Now
                        </Button>
                        </Link>
                        <Link to={'/wishlist'}>
                        <Button size="small" color="secondary">
                            Wish List
                        </Button>
                        </Link>
                    </CardActions>
                </Card>



            )
        })
    }

    render() {
        const { category, price } = this.state
        return (
            <div style={styles.root}>
                <h1 style={{left:'40%'}}>Products</h1>

                <div style={styles.input}>
                    <OutlinedInput
                        inputRef={(search) => (this.search = search)}
                    ></OutlinedInput>
                    <Button variant="contained" type="button" onClick={this.handleSearch} style={{left:'1%'}}>
                        Search
                        </Button>
                    <Typography variant="h6">Filter Products</Typography>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        value={category}
                        onChange={this.handleCategory}
                    >
                        <MenuItem value="sport">Shoes</MenuItem>
                        <MenuItem value="sandals">Sandals</MenuItem>
                        <MenuItem value="sneakers">Sneakers</MenuItem>
                    </Select>
                    <   Typography variant="h6">Sort Products by Price</Typography>
                    <InputLabel id="price">Sort</InputLabel>
                    <Select labelId="price" value={price} onChange={this.handlePrice}>
                        <MenuItem value="asc">From Low to High</MenuItem>
                        <MenuItem value="desc">From High to Low</MenuItem>
                    </Select>
                </div>


                <div style={styles.cardContainer}>
                    {this.renderCard()}
                </div>
            </div>
        )
    }
}



const styles = {
    root: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#f2f2f2',
        padding: '2% 7%'
    },
    title: {
        fontSize: 50,
        fontWidth: 600,
        height : '100%',
        margin: '2% 0px',
        left:'50'
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        justifyContent: 'flex-start'
    },
    card: {
        flexBasis: '19%',
        minWidth: '300px',
        marginBottom: '1%',
        marginRight: '1%'
    },
    contentArea: {
        height: '84%',
        padding: '1%'
    },
    contentImage: {
        width: '100%',
        padding: '5%'
    },
    contentActions: {
        height: '13%',
        alignItems: 'center'
    }
}

export default Products


// import React from "react";
// import Axios from "axios";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import { getProduct } from "../redux/action";

// import {
//   Card,
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
// } from "@material-ui/core";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import FavoriteIcon from "@material-ui/icons/Favorite";

// class Product extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       category: "",
//       price: "",
//     };
//   }
//   componentDidMount() {
//     this.getProductData("");
//   }
//   getProductData = (input) => {
//     Axios.get(`http://localhost:2000/products?q=${input}`)
//       .then((res) => this.props.getProduct(res.data))
//       .catch((err) => console.log(err));
//   };
//   handleCategory = (event) => {
//     console.log(event.target.value);
//     let cat = event.target.value;
//     this.setState({ category: cat });
//     this.getProductData(cat);
//   };
//   handleSearch = () => {
//     let searchInput = this.search.value;
//     this.getProductData(searchInput);
//   };
//   handlePrice = (event) => {
//     console.log(event.target.value);
//     let sortPrice = event.target.value;
//     let searchInput = this.search.value;
//     this.setState({ price: sortPrice });
//     Axios.get(
//       `http://localhost:2000/products?q=${searchInput}&_sort=price&_order=${sortPrice}`
//     )
//       .then((res) => this.props.getProduct(res.data))
//       .catch((err) => console.log(err));
//   };
//   render() {
//     const { category, price } = this.state;
//     return (
//       <div>
//         <div style={styles.input}>
//           <OutlinedInput
//             inputRef={(search) => (this.search = search)}
//           ></OutlinedInput>
//           <Button variant="contained" type="button" onClick={this.handleSearch}>
//             Search
//           </Button>
//           <Typography variant="h6">Filter Products</Typography>
//           <InputLabel id="category">Category</InputLabel>
//           <Select
//             labelId="category"
//             value={category}
//             onChange={this.handleCategory}
//           >
//             <MenuItem value="Men">Men</MenuItem>
//             <MenuItem value="Women">Women</MenuItem>
//             <MenuItem value="sport">Sport</MenuItem>
//             <MenuItem value="converse">Converse</MenuItem>
//             <MenuItem value="sandals">Sandals</MenuItem>
//           </Select>
//           <Typography variant="h6">Sort Products by Price</Typography>
//           <InputLabel id="price">Sort</InputLabel>
//           <Select labelId="price" value={price} onChange={this.handlePrice}>
//             <MenuItem value="asc">From Low to High</MenuItem>
//             <MenuItem value="desc">From High to Low</MenuItem>
//           </Select>
//         </div>
//         <div style={styles.parent}>
//           {this.props.product.length !== 0 ? (
//             this.props.product.map((item) => {
//               return (
//                 <Card style={styles.root} key={item.id}>
//                   <CardActionArea>
//                     <div>
//                       <CardMedia style={styles.media} image={item.images[0]} />
//                       <CardContent>
//                         <Typography style={styles.title} variant="h6">
//                           {item.name}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           color="textSecondary"
//                           component="p"
//                           style={styles.desc}
//                         >
//                           Rp. {item.price.toLocaleString()}
//                         </Typography>
//                       </CardContent>
//                     </div>
//                   </CardActionArea>
//                   <CardActions style={styles.action}>
//                     <Link to={`/details?id=${item.id}`}>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         startIcon={<AddShoppingCartIcon />}
//                       >
//                         Buy Now
//                       </Button>
//                     </Link>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       startIcon={<FavoriteIcon />}
//                     >
//                       Wish List
//                     </Button>
//                   </CardActions>
//                 </Card>
//               );
//             })
//           ) : (
//             <Typography variant="h4">Product not found!</Typography>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const styles = {
//   input: {
//     padding: "2%",
//   },
//   parent: {
//     marginTop: "2rem",
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//   },
//   root: {
//     width: 300,
//     margin: "1%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   media: {
//     height: 200,
//   },
//   action: {
//     display: "flex",
//     padding: 16,
//   },
//   title: {
//     fontWeight: 600,
//     margin: "2% 0px",
//   },

// };

// const mapStateToProps = (state) => {
//   return {
//     product: state.product,
//   };
// };

// export default connect(mapStateToProps, { getProduct })(Product);