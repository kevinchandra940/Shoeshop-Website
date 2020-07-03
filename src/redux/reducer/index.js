
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

// combine all reducers
const Reducers = combineReducers({
    user : userReducer,
    carousel : carouselReducer
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