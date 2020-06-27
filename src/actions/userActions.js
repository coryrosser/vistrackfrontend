import { NEW_USER, FETCH_USERS } from './types'

export const fetchUsers = () => dispatch => {
    console.log('fetching')
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(userData => {
        console.log(userData)
        dispatch({
            type: FETCH_USERS,
            payload: userData 
        })
    })
}