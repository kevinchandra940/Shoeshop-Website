
// import { combineReducers } from 'redux'
// import carouselReducer from './carouselReducer'
// import userReducer from './userReducer'

// export default combineReducers({
//     carouselReducer,
//     userReducer
// })


import { combineReducers } from 'redux'

// import reducers
import { userReducer } from './userReducer'
import { carouselReducer } from './carouselReducer'
import { productReducer } from './productReducer'


// combine all reducers
const Reducers = combineReducers({
    user : userReducer,
    carousel : carouselReducer,
    product: productReducer
})

// export
export default Reducers

// const reducer = {
//     user : {
//         id,
//         user,
//         ....
//     },
//     carousel : null
// }