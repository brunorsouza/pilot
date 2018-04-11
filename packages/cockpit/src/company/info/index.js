import { applySpec } from 'ramda'
import pricing from './pricing'

const info = client => client
  .company
  .current()
  .then(applySpec({
    pricing,
  }))

export default info
