import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconPercent from 'emblematic-icons/svg/Percent32.svg'

const Pricing = ({
  t,
}) => (
  <CardContent>
    <CardSection>
      <CardSectionDoubleLineTitle
        title={t('settings.company.card.general.title.rate')}
        icon={<IconPercent height={16} width={16} />}
        subtitle={t('settings.company.card.general.subtitle.rate')}
        collapsed={false}
        // onClick={
        //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
        // }
      />
    </CardSection>
  </CardContent>
)

Pricing.propTypes = {
  t: PropTypes.func.isRequired,
}

export default Pricing
