import pagarme from 'pagarme'
import { identity } from 'ramda'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { combineEpics } from 'redux-observable'

import {
  receiveLogin,
  receiveAccount,
  failLogin,
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
} from '.'

const loginEpic = action$ =>
  action$
    .ofType(LOGIN_REQUEST)
    .mergeMap(action => (
      pagarme.client.connect(action.payload)
        .then(receiveLogin)
        .catch((error) => {
          try {
            localStorage.removeItem('redux_localstorage_simple_account.sessionId')
          } catch (err) {
            console.warn(err.message) //eslint-disable-line
          }
          return failLogin(error)
        })
    ))

const accountEpic = action$ =>
  action$
    .ofType(LOGIN_RECEIVE)
    .mergeMap((action) => {
      const { error, payload: client } = action

      if (error) {
        return Promise.resolve(action.payload)
      }

      return client.user.current().catch(identity)
    })
    .map(receiveAccount)

export default combineEpics(loginEpic, accountEpic)
