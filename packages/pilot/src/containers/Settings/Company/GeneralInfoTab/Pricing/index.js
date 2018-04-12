import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconPercent from 'emblematic-icons/svg/Percent32.svg'
import BoxValues from './BoxValues'
import style from './style.css'

class Pricing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pricingCollapsed: false,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.contentRender = this.contentRender.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      pricingCollapsed: !this.state.pricingCollapsed,
    })
  }

  contentRender () {
    const {
      t,
      pricing,
    } = this.props
    return (
      <CardContent>
        <p
          className={style.title}
        >Para solicitar renegociação das taxas, entre em contato conosco
        </p>
        <Grid>
          <Row>
            {pricing && Object.entries(pricing).map(price => (<BoxValues
              key={price}
              t={t}
              services={price[1]}
              title={price[0]}
            />))
            }
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            title={t('settings.company.card.general.title.rate')}
            icon={<IconPercent height={16} width={16} />}
            subtitle={t('settings.company.card.general.subtitle.rate')}
            collapsed={this.state.pricingCollapsed}
            onClick={
              this.handleSectionTitleClick
            }
          />
          {
            !this.state.pricingCollapsed ?
              this.contentRender() :
              null
          }
        </CardSection>
      </CardContent>
    )
  }
}

Pricing.propTypes = {
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

export default Pricing
