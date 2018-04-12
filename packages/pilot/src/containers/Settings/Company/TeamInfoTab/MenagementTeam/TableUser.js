import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Button,
  CardSection,
  CardContent,
} from 'former-kit'
import IconTeam from 'emblematic-icons/svg/Sellers32.svg'

// const {
//   equals,
//   compose,
//   defaultTo,
//   path,
//   sortBy,
//   pipe,
//   toLower,
//   reverse,
// } = require('ramda')
//
// const isAscending = equals('ascending')
//
// const rowSort = acessor =>
//   sortBy(compose(toLower, defaultTo(''), path(acessor)))
//
// const getSort = (acessor, order) => (
//   isAscending(order) ?
//     rowSort(acessor) :
//     pipe(rowSort(acessor), reverse)
// )
//
// const getRowsSort = (rows, columns) =>
//   (orderColumn, order) => {
//     const referenceColumn = columns[orderColumn]
//     const referenceAcessor = referenceColumn.acessor
//     const sort = getSort(referenceAcessor, order)
//     return sort(rows)
//   }

const mountColumns = () => ([
  { title: 'Nome', accessor: ['name'], orderable: true },
  { title: 'Permissão', accessor: ['role'], orderable: true },
  { title: 'E-mail', accessor: ['email'], orderable: true },
  {
    title: 'Ações',
    isAction: true,
    orderable: false,
    renderer: () => (
      <Button
        relevance="high"
        icon={<IconTeam width={12} height={12} />}
        onClick={() => console.log('oi mundo')}
      />
    ),
  },
])

class TableUser extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      columns: mountColumns(),
      rows: props.team,
    }
  }

  render () {
    const {
      t,
    } = this.props
    const {
      rows,
      columns,
    } = this.state

    return (
      <CardContent>
        <CardSection>
          <h1>{t('OLA TEAM!')}</h1>
          <Table
            columns={columns}
            rows={rows}
          />
        </CardSection>
      </CardContent>
    )
  }
}

TableUser.propTypes = {
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
}

export default TableUser
