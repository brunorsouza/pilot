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
    gateway: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
    })),
    psp: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
    })),
    transfer: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
    })),
  }).isRequired,
}

export default GeneralInfoTab
