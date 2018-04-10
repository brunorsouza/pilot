import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconTeam from 'emblematic-icons/svg/Sellers32.svg'

const TeamInfoTab = ({
  t,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.team.title.management')}
          icon={<IconTeam height={16} width={16} />}
          subtitle={t('settings.company.card.team.subtitle.management')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>
  </Fragment>
)

TeamInfoTab.propTypes = {
  t: PropTypes.func.isRequired,
}

export default TeamInfoTab
