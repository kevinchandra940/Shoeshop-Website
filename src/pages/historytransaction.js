import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  IconButton,
  Collapse,
  Typography,
  Dialog,
  Button,
  InputLabel,
    Select,
    MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField
} from '@material-ui/core'
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Rating from "@material-ui/lab/Rating";

class HistoryTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      alert: false,
    }
  }

  Details = () => {
    console.log('Details')

    if (this.props.cart.length === 0) return

    this.setState({ alert: true })
  }

  componentDidMount() {
    Axios.get('http://localhost:2000/transaction_history')
      .then(res => {
        console.log(res.data)
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err))
  }

  renderTableHead = () => {
    return (
      <TableRow >
        {/* <TableCell>No</TableCell>
                <TableCell>Users ID</TableCell>
                <TableCell>Date Trans.</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Products</TableCell> */}
      </TableRow>
    )
  }


  renderTableBody = () => {
    const { opencollapse, cellId, read, star } = this.state;
    return this.state.data
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <TableBody >
            <TableRow >
              <IconButton
                aria-label="expand row"
                size="large"
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
              <TableCell >{index + 1}</TableCell>
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
                        <TableCell>Action</TableCell>
                        {/* <TableCell>Review</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.products.map((value) => {
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
                              <Button
                                style={{ fontColor: 'black' }}
                                variant="contained"
                                onClick={this.Details}
                              >
                                ! Details
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


  // renderTableBody = () => {
  //     return this.state.data.map((item, index) => {
  //         return (
  //             <TableRow key={index}>
  //                 <TableCell>{index + 1}</TableCell>
  //                 <TableCell>{item.userID}</TableCell>
  //                 <TableCell>{item.date}</TableCell>
  //                 <TableCell>{item.total}</TableCell>
  //                 <TableCell>
  //                     {item.products.map((aitem, indeks) => {
  //                         return (
  //                             <ul key={indeks} style={styles.ul}>
  //                                 <li>Name : {aitem.name}</li>
  //                                 <li>Brand : {aitem.brand}</li>
  //                                 <li>Color : {aitem.color}</li>
  //                                 <li>Size : {aitem.size}</li>
  //                                 <li>Quantity : {aitem.qty}</li>
  //                                 <li>Total : {aitem.total}</li>
  //                             </ul>
  //                         )
  //                     })}
  //                 </TableCell>
  //             </TableRow>
  //         )
  //     })
  // }

  render(price) {
    return (
      <div style={styles.root}>
        <h1 style={styles.title}>Transaction History Users</h1>
        <div style={{left:'100%'}}>

        <   Typography variant="h6">Sort Products by </Typography>
                    <InputLabel id="price">Sort</InputLabel>
                    <Select labelId="price" value={price} onChange={this.handlePrice}>
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="total">Total</MenuItem>
                    </Select>

                    
                    <Select labelId="price" value={price} onChange={this.handlePrice}>
                        <MenuItem value="asc">ASC</MenuItem>
                        <MenuItem value="desc">DSC</MenuItem>
                    </Select>

        </div>
        <Table>
          <TableHead>
            {this.renderTableHead()}
          </TableHead>
          <TableBody>
            {this.renderTableBody()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const styles = {
  root: {
    // minHeight: 'calc(100vh-70px)',
    height: 'calc(100vh-70px)',
    backgroundColor: '#f2f2f2',
    padding: '90px 10% 3% 10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  title: {
    margin: '2% 0px',
    left: '100%'
  },
  ul: {
    listStyle: 'none'
  }
}

const mapStateToProps = (state) => {
  console.log(state)
}

export default connect(mapStateToProps)(HistoryTransaction);