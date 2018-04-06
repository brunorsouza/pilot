import React from 'react'
import { storiesOf } from '@storybook/react'

import DetailsHead from './DetailsHead'
import CustomerCard from './CustomerCard'
import EventList from './EventList'
import PaymentCards from './PaymentCards'
import Operations from './Operations'
import RecipientSectionState from './RecipientSection'
import TotalDisplay from './TotalDisplay'
import TransactionDetailsCard from './TransactionDetailsCard'
import TreeView from './TreeView'
import PendingRequests from './PendingRequests'

storiesOf('Components', module)
  .add('Details head', () => <DetailsHead />)
  .add('Customer card', () => (
    <CustomerCard />
  ))
  .add('Recipient section', () => (
    <RecipientSectionState />
  ))
  .add('Transaction details card', () => (
    <TransactionDetailsCard />
  ))
  .add('Event list', () => (
    <EventList />
  ))
  .add('TotalDisplay', () => (
    <TotalDisplay />
  ))
  .add('Payment card', () => (
    <PaymentCards />
  ))
  .add('TreeView', () => (
    <TreeView />
  ))
  .add('Pending Requests', () => (
    <PendingRequests />
  ))
  .add('Operations', () => (
    <Operations />
  ))
