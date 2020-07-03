import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import {Login} from './redux/action'

//  

// import component
import Navbar from './components/navbar'
import Footer from './components/footer'

// import pages
import Home from './pages/home'
import LoginPages from './pages/login'
import Register from './pages/register'
import ProductDetails from './pages/productDetails'
import Detail from './components/products'
import Products from './components/products'
import UserCart from './pages/userCart'
import HistoryUser from './pages/historyuser'
import HistoryTransaction from './pages/historytransaction'
import NotFound from './pages/404'

class App extends React.Component {
    componentDidMount() {
        // keep login
        Axios.get(`http://localhost:2000/users?username=${localStorage.getItem('username')}`)
            .then(res => {
                this.props.Login(res.data[0])
            })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div>
                <Navbar />
                <Route path='/' component={Home} exact />
                <Route path='/login' component={LoginPages} />
                <Route path='/register' component={Register} />
                <Route path='/Productdetails' component={ProductDetails} />
                <Route path='/products' component={Products} />
                <Route path='/cart' component={UserCart}/>
                <Route path='/historyuser' component={HistoryUser}/>
                <Route path='/historytransaction' component={HistoryTransaction}/>
                <Route path='/notfound' component={NotFound}/>
                <Footer />
            </div>
        )
    }
}

export default connect(null, { Login })(App)