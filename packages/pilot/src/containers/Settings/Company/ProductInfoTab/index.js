import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconBarCode from 'emblematic-icons/svg/BarCode32.svg'
import IconSubscriptions from 'emblematic-icons/svg/Reprocess32.svg'

const ProductInfoTab = ({
  t,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.product.title.boleto')}
          icon={<IconBarCode height={16} width={16} />}
          subtitle={t('settings.company.card.product.subtitle.boleto')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.product.title.subscriptions')}
          icon={<IconSubscriptions height={16} width={16} />}
          subtitle={t('settings.company.card.product.subtitle.subscriptions')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>
  </Fragment>
)

ProductInfoTab.propTypes = {
  t: PropTypes.func.isRequired,
}

export default ProductInfoTab
