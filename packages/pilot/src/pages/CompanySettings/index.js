import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import cockpit from 'cockpit'

import CompanySettings from '../../containers/Settings/Company'

const mapStateToProps = ({
  account: { client, user },
}) => ({ client, user })

const Pricing = {
  gateway: [
    { title: 'credit_card', price: 'R$ 0,40 + 1%' },
    { title: 'debit_card', price: 'R$ 0,40 + 1%' },
    { title: 'boleto', price: 'R$ 0,40 + 1%' },
    { title: 'antifraud', price: 'R$ 0,5' },
  ],
  psp: [
    { title: 'mdrs', price: 'R$ 0,2' },
    { title: 'antecipation', price: 'R$ 0,5' },
  ],
  transfer: [
    { title: 'account_credit', price: 'R$ 0,5' },
    { title: 'doc', price: 'R$ 0,5' },
    { title: 'ted', price: 'R$ 0,5' },
  ],
}

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = null
    this.client = cockpit(props.client)
    this.client.company.info()
      .then(result => console.log(result))
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
  client: PropTypes.object.isRequired, // eslint-disable-line
}

export default enhanced(CompanySettingsPage)
