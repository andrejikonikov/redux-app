const fetchReducer = (state = {data: {}}, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        loading: true,
        data: state.data,
      }

    case 'LOAD_DATA_SUCCESS':
      return {
        loading: false,
        data: {...state.data, ...action.payload.data}
      }

    default:
      return state
  }
}

export default fetchReducer
