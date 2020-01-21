const fetchCountReducer = (state = 0, action) => {
  switch(action.type){
    case('INC_FETCH_COUNT'):
      return state + 1
    default:
      return state
  }
}

export default fetchCountReducer
