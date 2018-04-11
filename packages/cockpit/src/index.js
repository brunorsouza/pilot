import { applySpec } from 'ramda'
import transactions from './transactions'
import user from './user'
import company from './company'

const client = applySpec({
  transactions,
  user,
  company,
})

export default client
