function isValueValid(value) {
  if (value > 1 && value < 10) {
    return true
  }

  return false
}

export const updateValue = (value) => {
  const { length } = value

  return {
    type: 'UPDATE_INPUT',
    payload: {txt: value, len: length, isValid: isValueValid(length)},
  }
}

export const loadData = (path, value) => {
  return {
    type: 'LOAD_DATA',
    payload: {
      request: {
        url: `${path}/${value}`,
      },
    },
  }
}

export const updateFetchCount = (value) => {
  return {
    type: 'INC_FETCH_COUNT'
  }
}
