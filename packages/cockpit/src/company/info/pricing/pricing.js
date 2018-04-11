import {
  applySpec,
  path,
  pathOr,
  reduce,
  pipe,
  pick,
  unless,
  concat,
  divide,
  isEmpty,
  juxt,
  isNil,
  __,
} from 'ramda'

const pricingItem = (title, getPrice) => pricingObj => ({
  title,
  price: getPrice(pricingObj),
})

const getTransactionPrice = title => pipe(
  juxt([
    pipe(
      pathOr('', ['transaction_cost', title]),
      unless(isEmpty, pipe(
        divide(__, 100),
        String,
        concat('R$ ')
      )),
      unless(isEmpty, concat(__, ' + '))
    ),
    pipe(
      pathOr('', ['transaction_spread', title]),
      unless(isEmpty, pipe(String, concat(__, '%')))
    ),
  ]),
  reduce(concat, '')
)

const getPriceInRS = pathToPrice => pipe(
  pathOr(null, pathToPrice),
  unless(isNil, pipe(
    divide(__, 100),
    String,
    concat('R$ ')
  ))
)

const gatewayCostArray = [
  pricingItem('boleto', getTransactionPrice('boleto')),
  pricingItem('credit_card', getTransactionPrice('boleto')),
  pricingItem('debit_card', getTransactionPrice('boleto')),
  pricingItem('antifraud_cost', getPriceInRS(['antifraud_cost'])),
  pricingItem('minimum_monthly_payment', getPriceInRS(['minimum_monthly_payment'])),
]

const getGatewayCost = pipe(
  pathOr([], ['gateway', 'live']),
  pick(['transaction_cost', 'transaction_spread', 'minimum_monthly_payment']),
  juxt(gatewayCostArray)
)

const pspCostArray = [
  pricingItem('anticipation', getPriceInRS(['anticipation'])),
  pricingItem('mdrs', getPriceInRS(['mdrs'])),
]

const getPspCost = pipe(
  pathOr({}, ['psp', 'live']),
  juxt(pspCostArray)
)

const transferCostAttay = [
  pricingItem('credito_em_conta', getPriceInRS(['credito_em_conta'])),
  pricingItem('ted', getPriceInRS(['ted'])),
  pricingItem('doc', getPriceInRS(['doc'])),
]

const getTransferCost = pipe(
  pathOr([], ['transfers']),
  juxt(transferCostAttay)
)

const getPricing = pipe(
  path(['pricing']),
  applySpec({
    gateway: getGatewayCost,
    psp: getPspCost,
    transfer: getTransferCost,
  })
)

export default getPricing
