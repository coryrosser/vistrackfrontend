import { FETCH_USERS, LOGIN, CREATE_USER } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        
        case FETCH_USERS:
            return {
                ...state,
                users: action.users
            }
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                current_user: action.user
            }
        case 'SET_LOGIN':
            return {
                ...state,
                isLoggedIn: true,
            }
        // case LOGOUT:
        //     return (

        //     )
        case CREATE_USER:
            return {
                ...state,
                isLoggedIn: true,
                current_user: action.user
            }
        default:
            return state;
    }
}