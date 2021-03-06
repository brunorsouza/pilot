import moment from 'moment'

import {
  SEARCH_REQUEST,
  SEARCH_RECEIVE,
} from './actions'

const initialState = {
  loading: true,
  query: {
    search: '',
    dates: {
      start: moment(new Date()).subtract(30, 'days'),
      end: moment(new Date()),
    },
    filters: {},
    offset: 1,
    count: 15,
    sort: {},
  },
}

export default function searchReducer (state, action) {
  switch (action.type) {
    case SEARCH_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: true,
        query,
      }
    }

    case SEARCH_RECEIVE: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        loading: false,
        query,
      }
    }

    default:
      return initialState
  }
}
