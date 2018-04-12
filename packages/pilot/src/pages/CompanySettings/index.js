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

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfo: {
        pricing: {},
        apiKeys: {},
      },
    }
    this.client = cockpit(props.client)
  }

  componentWillMount () {
    this.client.company.info()
      .then((companyInfo) => {
        this.setState({ companyInfo })
      })
  }
  render () {
    const {
      t,
    } = this.props

    const {
      companyInfo: {
        pricing,
      },
    } = this.state
    console.log(this.state)

    return (
      <CompanySettings
        pricing={pricing}
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
