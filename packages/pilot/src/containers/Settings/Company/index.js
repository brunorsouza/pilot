import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Card,
  CardContent,
  TabBar,
  TabItem,
} from 'former-kit'

import GeneralInfoTab from './GeneralInfoTab'
import ProductInfoTab from './ProductInfoTab'
import TeamInfoTab from './TeamInfoTab'
import RegisterInfoTab from './RegisterInfoTab'

class CompanySettings extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: 1 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selected) {
    this.setState({ selected })
  }

  render () {
    const {
      t,
      pricing,
    } = this.props

    return (
      <Grid>
        <Row>
          <Col
            palm={12}
            tablet={12}
            desk={12}
            tv={12}
          >
            <Card>
              <CardContent>
                <TabBar
                  variant="just-text"
                  selected={this.state.selected}
                  onTabChange={this.changeTab}
                >
                  <TabItem text={t('settings.company.tab.general')}>
                    <GeneralInfoTab
                      t={t}
                      pricing={pricing}
                    />
                  </TabItem>
                  <TabItem text={t('settings.company.tab.product')}>
                    <ProductInfoTab
                      t={t}
                      pricing={pricing}
                    />
                  </TabItem>
                  <TabItem text={t('settings.company.tab.team')}>
                    <TeamInfoTab
                      t={t}
                      pricing={pricing}
                    />
                  </TabItem>
                  <TabItem text={t('settings.company.tab.register')}>
                    <RegisterInfoTab
                      t={t}
                      pricing={pricing}
                    />
                  </TabItem>
                </TabBar>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

CompanySettings.propTypes = {
  t: PropTypes.func,
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

CompanySettings.defaultProps = {
  t: t => t,
}

export default CompanySettings
