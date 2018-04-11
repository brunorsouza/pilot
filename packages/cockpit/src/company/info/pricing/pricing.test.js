import companyMock from '../companyMock.json'
import pricing from './pricing'

const mock = {
  antifraud_cost: 70,
  gateway: {
    minimum_monthly_payment: 0,
    transaction_cost: {
      boleto: 380,
      credit_card: 50,
      debit_card: 50,
    },
    transaction_spread: {
      boleto: 0,
      credit_card: 0,
      debit_card: 1.5,
    },
  },
  psp: {
    anticipation: 3.14,
    mdrs: [],
  },
}

describe.only('Company pricing details to dashboard', () => {
  it('should get formated pricing when receives company object', () => {
    const result = pricing(companyMock)

    expect(result).toEqual(mock)
  })
})
