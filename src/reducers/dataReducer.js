export default (state = {}, action) => {
    switch (action.type) {
        
        case 'FETCH_DATASETS':
            return {
                ...state,
                datasets: action.datasets
            }
        case 'ADD_DATASET':
            if(!state.datasets) {
                return {
                    ...state,
                    datasets: [action.dataset]
                }
            } else {
                return {
                    ...state,
                    datasets: [...state.datasets, action.dataset]
                }
            }
            
        // case LOGOUT:
        //     return (

        //     )
        case 'INSPECT':
            console.log('inspect')
            return {
                ...state,
                inspectedDataset: action.dataset
            }
        default:
            return state;
    }
}