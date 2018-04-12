import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconTeam from 'emblematic-icons/svg/Sellers32.svg'
import TableUser from './TableUser'

class MenagementTeam extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.handleMountBody = this.handleMountBody.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleMountBody () {
    const {
      t,
      team,
    } = this.props
    return (
      <CardContent>
        <Grid>
          <Row>
            <TableUser
              t={t}
              team={team}
            />
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
            title={t('settings.company.card.team.title.management')}
            icon={<IconTeam height={16} width={16} />}
            subtitle={t('settings.company.card.team.subtitle.management')}
            collapsed={this.state.collapsed}
            onClick={
              this.handleSectionTitleClick
            }
          />
          {
            this.state.collapsed ?
              this.handleMountBody() :
              null
          }
        </CardSection>
      </CardContent>
    )
  }
}

MenagementTeam.propTypes = {
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
}

export default MenagementTeam
