const inputReducer = (state = { input: { txt: ''} } , action) => {
  switch(action.type){
    case('UPDATE_INPUT'):
      return { input: action.payload }
    default:
      return state
  }
}

export default inputReducer
