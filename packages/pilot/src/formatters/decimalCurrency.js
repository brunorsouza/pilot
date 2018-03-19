import { isNil } from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const decimal = (value) => {
  if (isNil(value)) {
    return null
  }

  const formatter = new Intl.NumberFormat({
    style: 'decimal',
  })

  return formatter.format(Number(value) / 100)
}

export default decimal
