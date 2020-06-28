export default (state = {}, action) => {
    switch (action.type) {
        
        case 'FETCH_DATASETS':
            return {
                ...state,
                datasets: action.datasets
            }
        case 'EDIT_DATASET':
            return {
                ...state,
                isLoggedIn: true,
                current_dataset: action.dataset
            }
        // case LOGOUT:
        //     return (

        //     )
        case 'CREATE_DATASET':
            return {
                ...state,
                isLoggedIn: true,
                current_user: action.user
            }
        default:
            return state;
    }
}