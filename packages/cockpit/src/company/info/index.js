import { applySpec } from 'ramda'
import pricing from './pricing'
import apiKeys from './apiKeys'

const info = client => () => client
  .company
  .current()
  .then(applySpec({
    pricing,
    apiKeys,
  }))

export default info
