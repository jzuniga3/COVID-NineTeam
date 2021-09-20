// reducers start state and update with an action
const initialState = {
    currentUser: null
}

export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}