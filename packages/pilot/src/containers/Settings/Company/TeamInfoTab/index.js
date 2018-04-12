import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import MenagementTeam from './MenagementTeam'

const TeamInfoTab = ({
  t,
  team,
}) => (
  <Fragment>
    <MenagementTeam
      t={t}
      team={team}
    />
  </Fragment>
)

TeamInfoTab.propTypes = {
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
}

export default TeamInfoTab
