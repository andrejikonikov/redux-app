import React, { Fragment, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { updateValue, loadData, updateFetchCount } from '../../actions'

import './Form.sass'

const endpoints = [
  {
    path: '/person',
    target: 'val1',
  }, {
    path: '/facility',
    target: 'val1',
  }, {
    path: '/exposure',
    target: 'val2',
  }
]

function Form({ txt, isValid, data, fetchCount }) {
  const dispatch = useDispatch()
  const { val1, val2, val3, val4 } = data || {}
  const showOverlay = fetchCount === 3 && !!val3 && !!val4

  function fetchData({ path, target }) {
    let r = dispatch(loadData(path, fetchCount === 0 ? txt : data[target]))

    r.then((args) => {
      dispatch(updateFetchCount())
    })
  }

  useEffect(() => {

    if (fetchCount === 1 && !!val1) {
      fetchData(endpoints[1])
    }

    if (fetchCount === 2 && !!val2) {
      fetchData(endpoints[2])
    }
  }, [fetchCount])

  return (
    <div className="form">
      <div className="form__card">
        {showOverlay ? (
          <div className="form__overlay">
            multiplying val3({val3}) by val4({val4}):
            {val3*val4}
          </div>
        ) : (
          <Fragment>
            <div class="form__input-container">
              <input
                className="form__input"
                value={txt}
                onChange={(e) => {
                  dispatch(updateValue(e.target.value))
                }}
                type="text"
                placeholder="insert from 1 to 10 characters"
              />
            <span className={`form__input-border ${isValid ? '' : 'form__input-border--red'} `}></span>
            </div>
            <button
              onClick={() => { fetchData(endpoints[0]) }}
              className="form__action"
              disabled={!isValid && !fetchCount}
            >
              fetch data
            </button>
          </Fragment>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    inputReducer: {
      input: {
        txt,
        isValid,
      }
    },
    fetchReducer: { data },
    fetchCountReducer: fetchCount
  } = state

  return {
    txt,
    isValid,
    data,
    fetchCount,
  }
}

export default connect(mapStateToProps)(Form)
