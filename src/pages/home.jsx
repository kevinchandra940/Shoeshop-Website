import React from 'react'

// import component
import Carousel from '../components/carousel'
import Products from '../components/products'

class Home extends React.Component {
    render () {
        return (
            <div>
                <Carousel/>
                <Products/>
            </div>
        )
    }
}

export default Home