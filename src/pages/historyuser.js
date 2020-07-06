import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { getHistory } from "../redux/action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  IconButton,
  Collapse,
  Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Rating from "@material-ui/lab/Rating";
import { Login } from '../redux/action';
import { getProduct } from '../redux/action'

class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      opencollapse: false,
      cellId: null,
      read: false,
      star: 0,
      rate: 0,
      alert: false,
      idProduct: null
    };
  }

  componentDidMount() {
    Axios.get(
      `http://localhost:2000/transaction_history?userID=${this.props.id}`
    )
      .then((res) => {
        // this.props.getHistory(res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.setState({ alert: false })
  }
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

  handleConfirm = () => {
    const { rate } = this.state
    Axios.get(`http://localhost:2000/products/${this.state.idProduct}`)
      .then(res => {
        // if (res.data.rating.length !== 0) {
          console.log(res.data.rating)
          let total = res.data.rating
          total.push(rate)
          console.log(total)
          Axios.patch(`http://localhost:2000/products/${this.state.idProduct}`, { rating: total })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        // } else {
        //   Axios.patch(`http://localhost:2000/products/${this.state.idProduct}`, { rating: [rate] })
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
        // }
        this.setState({ alert: false })
      })
      .catch(err => console.log(err))
  }

  renderTableBody = () => {
    const { opencollapse, cellId, read, star, rate, idProduct} = this.state;
    return this.state.data
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <TableBody>
            <TableRow>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() =>
                  this.setState({ opencollapse: !opencollapse, cellId: index })
                }
                open={opencollapse && cellId === index}
              >
                {opencollapse && cellId === index ? (
                  <KeyboardArrowUpIcon />
                ) : (
                    <KeyboardArrowDownIcon />
                  )}
              </IconButton>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>Rp. {item.total.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={4}
              >
                <Collapse
                  in={opencollapse && cellId === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box>
                    <Typography variant="h6" gutterBottom component="div">
                      History Details
                    </Typography>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Review</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.products.map((value, i) => {
                        return (
                          <TableRow>
                            <TableCell>
                              <img src={value.images[0]} alt="" width="100px" />
                            </TableCell>
                            <TableCell>{value.name}</TableCell>
                            <TableCell>{value.color}</TableCell>
                            <TableCell>{value.size}</TableCell>
                            <TableCell>{value.qty}</TableCell>
                            <TableCell>
                              Rp. {value.total.toLocaleString()}
                            </TableCell>
                            <TableCell>
                            <Button onClick={() => this.buttonRating(index, i) } color='primary' variant='outlined'>Rate
                            </Button>
                            </TableCell>
                            
                            <TableCell>
                              <Box
                                component="fieldset"
                                mb={3}
                                borderColor="transparent"
                              >
                                {/* <Rating
                                  name="simple-controlled"
                                  readOnly={read}
                                  value={star}
                                  onChange={(event, newvalue) =>
                                    this.handleRating(newvalue)
                                  }
                                /> */}
                                <Rating
                                  name="read-only"
                                  readOnly
                                  value={rate}
                                  precision={0.5}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      });
  };
  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>No</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Total</TableCell>
      </TableRow>
    );
  };

  render() {
    const { read, rate, alert } = this.state
    return (
      <div style={styles.root}>
        <Typography variant="h4">
          Transaction History {this.props.username}
        </Typography>
        <Table style={styles.table}>
          <TableHead>{this.renderTableHead()}</TableHead>
          {this.renderTableBody()}
        </Table>
        <Dialog
          open={alert}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title">Rate our products</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Give us a feedback!'}
            </DialogContentText>
            <Box
              component="fieldset"
              mb={3}
              borderColor="transparent"
            >
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newvalue) =>
                  this.handleRating(newvalue)
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
                    </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              Confirm
                    </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15vh 0",
  },
  table: {
    width: "70vw",
  },
  card: {
    margin: "1% 0",
    padding: "2%",
    width: "100%",
  },
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    username: state.user.username,
    cart: state.user.cart,
    product: state.product
  };
};
export default connect(mapStateToProps, {Login, getProduct })(UserHistory);
