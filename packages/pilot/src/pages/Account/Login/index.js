import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import { compose } from 'ramda'
import { connect } from 'react-redux'

import Login from '../../../containers/Account/Login'
import { requestLogin } from '../actions'

import environment from '../../../environment'

const mapStateToProps = (state) => {
  const {
    account: {
      errors,
      loading,
      token,
    },
  } = state

  return {
    errors,
    loading,
    token,
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: (data) => {
    dispatch(requestLogin({ ...data, environment }))
  },
})

const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate(),
  withRouter
)

class LoginPage extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  handlePasswordRecovery (e) {
    e.preventDefault()
    window.location = 'https://dashboard.pagar.me/#/forgot_password'
  }

  render () {
    return (
      <Login
        t={this.props.t}
        errors={this.props.errors}
        loading={this.props.loading}
        onLogin={this.props.onLogin}
        onPasswordRecovery={this.handlePasswordRecovery}
      />
    )
  }
}

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
}

LoginPage.defaultProps = {
  errors: {},
  loading: false,
}

export default enhanced(LoginPage)
