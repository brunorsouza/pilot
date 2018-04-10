import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  compose,
} from 'ramda'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

import CompanySettings from '../../containers/Settings/Company'

const Pricing = {
  gateway: {
    fix_cost: {
      credit_card: 1,
      debit_card: 2,
      boleto: 3,
    },
    percent: {
      credit_card: 1,
      debit_card: 2,
      boleto: 3,
    },
  },
  psp: {
    mdrs: 1,
    antecipation: 2,
  },
  autifraud: 230,
  transfer: {
    credito_em_conta: 1,
    ted: 2,
    doc: 3,
  },
}

const mapStateToProps = ({
  account: { client, user },
}) => ({ client, user })


const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = null
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <CompanySettings
        pricing={Pricing}
        t={t}
      />
    )
  }
}

CompanySettingsPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(CompanySettingsPage)
