import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Pricing from './Pricing'
import ApiKey from './ApiKey'

const GeneralInfoTab = ({
  t,
  pricing,
}) => (
  <Fragment>
    <Pricing
      t={t}
      pricing={pricing}
    />
    <ApiKey
      t={t}
    />
  </Fragment>
)


GeneralInfoTab.propTypes = {
  t: PropTypes.func.isRequired,
  pricing: PropTypes.shape({
    gateway: PropTypes.shape({
      fix_cost: PropTypes.shape({
        credit_card: PropTypes.number,
        debit_card: PropTypes.number,
        boleto: PropTypes.number,
      }),
      percent: PropTypes.shape({
        credit_card: PropTypes.number,
        debit_card: PropTypes.number,
        boleto: PropTypes.number,
      }),
    }),
    psp: PropTypes.shape({
      mdrs: PropTypes.number,
      antecipation: PropTypes.number,
    }),
    autifraud: PropTypes.number,
    transfer: PropTypes.shape({
      credito_em_conta: PropTypes.number,
      ted: PropTypes.number,
      doc: PropTypes.number,
    }),
  }).isRequired,
}

export default GeneralInfoTab
