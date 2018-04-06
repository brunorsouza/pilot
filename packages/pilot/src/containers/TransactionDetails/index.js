/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  always,
  anyPass,
  both,
  contains,
  either,
  equals,
  isEmpty,
  isNil,
  map,
  negate,
  path,
  pipe,
  prop,
  sum,
  unless,
  when,
} from 'ramda'
import {
  Alert,
  Card,
  CardTitle,
  Col,
  Grid,
  Row,
  Legend,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import statusLegends from '../../models/statusLegends'
import decimalCurrencyFormatter from '../../formatters/decimalCurrency'
import currencyFormatter from '../../formatters/currency'
import PaymentCard from '../../components/PaymentCard'
import PaymentBoleto from '../../components/PaymentBoleto'
import TotalDisplay from '../../components/TotalDisplay'
import Event from '../../components/Event'
import RecipientList from '../../containers/RecipientList'
import CustomerCard from '../../components/CustomerCard'
import TransactionDetailsCard from '../../components/TransactionDetailsCard'
import TreeView from '../../components/TreeView'
import DetailsHead from '../../components/DetailsHead'

import style from './style.css'

const isZeroOrNegative = value => value <= 0

const formatValues = map(when(
  isNil,
  always(0)
))

const getOutAmount = pipe(
  formatValues,
  sum,
  unless(
    isZeroOrNegative,
    negate
  )
)

const getOperationLegendStatus = ({ type }) => {
  if (contains('chargeback', type)) {
    return statusLegends.chargedback
  }

  if (contains('authorize', type)) {
    return statusLegends.authorized
  }

  return statusLegends.paid
}

const isEmptyOrNull = anyPass([isEmpty, isNil])

const isChargebackStatus = either(
  contains('chargeback'),
  contains('chargedback')
)

const isChargebackedTransaction = pipe(
  prop('status'),
  isChargebackStatus
)

const isBoletoTransaction = pipe(
  path(['payment', 'method']),
  equals('boleto')
)

const isWaitingPaymentTransaction = pipe(
  prop('status'),
  equals('waiting_payment')
)

const isBoletoWaitingPayment = both(
  isBoletoTransaction,
  isWaitingPaymentTransaction
)

const showStatusAlert = either(
  isChargebackedTransaction,
  isBoletoWaitingPayment
)

const getHeaderAmountLabel = (transaction, headerLabels) => {
  if (isBoletoTransaction(transaction)) {
    return headerLabels.boletoAmountLabel
  }
  return headerLabels.cardAmountLabel
}

const renderLegend = status => (
  <Legend
    color={statusLegends[status].color}
    acronym={statusLegends[status].text}
    hideLabel
  >
    { statusLegends[status].acronym }
  </Legend>
)

class TransactionDetails extends Component {
  constructor (props) {
    super(props)

    this.renderAlertInfo = this.renderAlertInfo.bind(this)
    this.renderBoleto = this.renderBoleto.bind(this)
    this.renderEvents = this.renderEvents.bind(this)
    this.renderOutAmountSubTitle = this.renderOutAmountSubTitle.bind(this)
    this.renderPayment = this.renderPayment.bind(this)
    this.renderPaymentCard = this.renderPaymentCard.bind(this)
  }

  renderAlertInfo () {
    const {
      alertLabels,
      boletoWarningMessage,
      transaction,
    } = this.props

    if (isBoletoWaitingPayment(transaction)) {
      return (
        <span>
          {boletoWarningMessage}
        </span>
      )
    }
    return (
      <span>
        <strong> {alertLabels.chargeback_reason_label} </strong>
        <span> {alertLabels.chargeback_reason} </span>
        <strong>
          {alertLabels.reason_code}
        </strong>
      </span>
    )
  }

  renderBoleto () {
    const {
      transaction: {
        boleto: {
          barcode,
          due_date,
        },
      },
      paymentBoletoLabels,
      onCopyBoletoUrl,
      onShowBoleto,
    } = this.props

    return (
      <PaymentBoleto
        barcode={barcode}
        copyBarcodeLabel={paymentBoletoLabels.copy}
        dueDate={moment(due_date).format('L')}
        dueDateLabel={paymentBoletoLabels.due_date}
        onCopy={onCopyBoletoUrl}
        onShow={onShowBoleto}
        showBoletoLabel={paymentBoletoLabels.show}
        title={paymentBoletoLabels.title}
      />
    )
  }

  renderPaymentCard () {
    const {
      transaction: {
        card: {
          first_digits,
          last_digits,
          brand_name,
          holder_name,
        },
      },
      paymentCardLabels,
    } = this.props

    return (
      <PaymentCard
        title={paymentCardLabels.title}
        first={first_digits}
        last={last_digits}
        holderName={holder_name}
        brand={brand_name}
      />
    )
  }

  renderPayment () {
    const { payment } = this.props.transaction

    if (payment.method === 'credit_card') {
      return this.renderPaymentCard()
    }
    return this.renderBoleto()
  }

  renderOutAmountSubTitle () {
    const { totalDisplayLabels } = this.props

    return (
      <span>
        <div>
          {totalDisplayLabels.mdr}
        </div>
        <div>
          {totalDisplayLabels.cost}
        </div>
        <div>
          {totalDisplayLabels.refund}
        </div>
      </span>
    )
  }

  renderEvents () {
    const {
      transaction: { operations },
      atLabel,
    } = this.props

    return operations.map((operation, index) => {
      const {
        type,
        status,
        created_at,
        cycle,
      } = operation
      const legendStatus = getOperationLegendStatus(operation)
      const number = operations.length - index
      const date = moment(created_at)
      const key = `${type}_${status}_${(cycle || 0)}_${index}`
      return (
        <Event
          key={key}
          number={number}
          title={legendStatus.text}
          color={legendStatus.color}
          active={index === 0}
          collapsed={index !== 0}
        >
          <section>
            <p>
              {
                `${date.format('L')} ${atLabel} ${date.format('HH:mm')}`
              }
            </p>
          </section>
        </Event>
      )
    })
  }

  render () {
    const {
      alertLabels,
      customerLabels,
      eventsLabels,
      headerLabels,
      installmentColumns,
      metadataTitle,
      recipientsLabels,
      totalDisplayLabels,
      transaction,
      transactionDetailsLabels,
    } = this.props

    const {
      acquirer,
      amount,
      card,
      customer,
      id,
      payment,
      recipients,
      soft_descriptor,
      status,
      subscription,
      metadata,
    } = transaction

    const transactionDetailsContent = {
      tid: id,
      acquirer_name: acquirer ? acquirer.name : null,
      acquirer_response_code: acquirer ? acquirer.response_code : null,
      authorization_code: acquirer ? acquirer.response_code : null,
      nsu: acquirer ? acquirer.sequence_number : null,
      soft_descriptor,
      subscription_id: subscription ? subscription.id : null,
      capture_method: card ? card.capture_method : null,
    }
    if (isEmpty(transaction)) {
      return (<div />)
    }

    return (
      <Grid>
        <Row stretch>
          <Col
            desk={12}
            tv={12}
            tablet={12}
            palm={12}
          >
            <DetailsHead
              title={headerLabels.title}
              identifier={`#${id}`}
              properties={[
                {
                  title: headerLabels.statusLabel,
                  children: renderLegend(status),
                },
                {
                  title: headerLabels.installmentsLabel,
                  children: headerLabels.installments,
                },
                {
                  title: getHeaderAmountLabel(transaction, headerLabels),
                  children: currencyFormatter(amount),
                },
              ]}
            />
          </Col>
        </Row>

        <Row stretch>
          <Col
            desk={3}
            tv={3}
            tablet={6}
            palm={12}
          >
            { this.renderPayment() }
          </Col>
          <Col
            desk={3}
            tv={3}
            tablet={6}
            palm={12}
          >
            <Card>
              <TotalDisplay
                amount={payment.paid_amount}
                color="#37cc9a"
                subtitle={totalDisplayLabels.captured_at}
                title={totalDisplayLabels.paid_amount}
                unity={totalDisplayLabels.currency_symbol}
              />
            </Card>
          </Col>
          <Col
            desk={3}
            tv={3}
            tablet={6}
            palm={12}
          >
            <Card>
              <TotalDisplay
                amount={
                  getOutAmount([
                    payment.refund_amount,
                    payment.cost_amount,
                    payment.mdr_amount,
                  ])
                }
                color="#ff796f"
                subtitle={this.renderOutAmountSubTitle()}
                title={totalDisplayLabels.out_amount}
                unity={totalDisplayLabels.currency_symbol}
              />
            </Card>
          </Col>
          <Col
            desk={3}
            tv={3}
            tablet={6}
            palm={12}
          >
            <Card>
              <TotalDisplay
                amount={payment.net_amount}
                color="#4ca9d7"
                subtitle={totalDisplayLabels.receive_date}
                title={totalDisplayLabels.net_amount}
                unity={totalDisplayLabels.currency_symbol}
              />
            </Card>
          </Col>
        </Row>

        {showStatusAlert(transaction) &&
          <Row stretch>
            <Col
              desk={12}
              tv={12}
              tablet={12}
              palm={12}
            >
              <div className={style.statusAlert}>
                <Alert
                  type="info"
                  action={alertLabels.resubmit}
                  icon={<IconInfo height={16} width={16} />}
                >
                  {this.renderAlertInfo()}
                </Alert>
              </div>
            </Col>
          </Row>
        }

        <Row>
          <Col
            desk={9}
            tv={9}
            tablet={12}
            palm={12}
          >
            <Grid>
              {!isEmptyOrNull(recipients) &&
                <Row>
                  <Col
                    palm={12}
                    tablet={12}
                    desk={12}
                    tv={12}
                  >
                    <RecipientList
                      collapseInstallmentTitle={recipientsLabels.collapseInstallmentTitle}
                      expandInstallmentTitle={recipientsLabels.expandInstallmentTitle}
                      installmentTotalLabel={recipientsLabels.installmentTotalLabel}
                      installmentsTableColumns={installmentColumns}
                      liabilitiesLabel={recipientsLabels.liabilitiesLabel}
                      netAmountLabel={recipientsLabels.netAmountLabel}
                      noRecipientLabel={recipientsLabels.noRecipientLabel}
                      outAmountLabel={recipientsLabels.outAmountLabel}
                      paymentMethod={payment.method}
                      recipients={recipients}
                      statusLabel={recipientsLabels.statusLabel}
                      title={recipientsLabels.title}
                      total={decimalCurrencyFormatter(payment.paid_amount)}
                      totalRecipientsLabel={recipientsLabels.totalRecipientsLabel}
                      totalTitle={recipientsLabels.totalTitle}
                    />
                  </Col>
                </Row>
              }
              {!isEmptyOrNull(customer) &&
                <Row>
                  <Col
                    palm={12}
                    tablet={12}
                    desk={12}
                    tv={12}
                  >
                    <CustomerCard
                      contents={customer}
                      labels={customerLabels}
                      title={customerLabels.title}
                    />
                  </Col>
                </Row>
              }
              <Row>
                <Col
                  palm={12}
                  tablet={12}
                  desk={12}
                  tv={12}
                >
                  <TransactionDetailsCard
                    title={transactionDetailsLabels.title}
                    labels={transactionDetailsLabels}
                    contents={transactionDetailsContent}
                  />
                </Col>
              </Row>
              {!isEmptyOrNull(metadata) &&
                <Row>
                  <Col
                    palm={12}
                    tablet={12}
                    desk={12}
                    tv={12}
                  >
                    <TreeView
                      title={metadataTitle}
                      data={metadata}
                    />
                  </Col>
                </Row>
              }
            </Grid>
          </Col>
          <Col
            desk={3}
            tv={3}
            tablet={12}
            palm={12}
          >
            <Card>
              <CardTitle title={eventsLabels.title} />
              <div>
                {this.renderEvents()}
              </div>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TransactionDetails.propTypes = {
  alertLabels: PropTypes.shape({
    chargeback_reason: PropTypes.string,
    chargeback_reason_label: PropTypes.string,
    reason_code: PropTypes.string,
    resubmit: PropTypes.string,
  }).isRequired,
  atLabel: PropTypes.string.isRequired,
  boletoWarningMessage: PropTypes.string.isRequired,
  customerLabels: PropTypes.shape({
    born_at: PropTypes.string,
    city: PropTypes.string,
    complement: PropTypes.string,
    document_number: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    name: PropTypes.string,
    neighborhood: PropTypes.string,
    number: PropTypes.string,
    phone: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
    title: PropTypes.string,
    zip_code: PropTypes.string,
  }).isRequired,
  eventsLabels: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  headerLabels: PropTypes.shape({
    installments: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  installmentColumns: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    payment_date: PropTypes.instanceOf(moment),
    original_payment_date: PropTypes.instanceOf(moment),
    net_amount: PropTypes.number,
    costs: PropTypes.shape({
      mdr: PropTypes.number,
      anticipation: PropTypes.number,
      chargeback: PropTypes.number,
      refund: PropTypes.number,
    }),
  })).isRequired,
  onDismissAlert: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onCopyBoletoUrl: PropTypes.func,
  onShowBoleto: PropTypes.func,
  paymentBoletoLabels: PropTypes.shape({
    copy: PropTypes.string,
    due_date: PropTypes.string,
    show: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  paymentCardLabels: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  recipientsLabels: PropTypes.shape({
    collapseInstallmentTitle: PropTypes.string,
    expandInstallmentTitle: PropTypes.string,
    installmentTotalLabel: PropTypes.string,
    liabilitiesLabel: PropTypes.string,
    netAmountLabel: PropTypes.string,
    noRecipientLabel: PropTypes.string,
    outAmountLabel: PropTypes.string,
    statusLabel: PropTypes.string,
    title: PropTypes.string,
    totalRecipientsLabel: PropTypes.string,
    totalTitle: PropTypes.string,
  }).isRequired,
  totalDisplayLabels: PropTypes.shape({
    captured_at: PropTypes.string,
    currency_symbol: PropTypes.string,
    mdr: PropTypes.string,
    cost: PropTypes.string,
    net_amount: PropTypes.string,
    out_amount: PropTypes.string,
    paid_amount: PropTypes.string,
    receive_date: PropTypes.string,
    refund: PropTypes.string,
  }).isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    soft_descriptor: PropTypes.string,
    external_id: PropTypes.string,
    status: PropTypes.string,
    status_reason: PropTypes.string,
    boleto: PropTypes.shape({
      barcode: PropTypes.string,
      due_date: PropTypes.instanceOf(moment),
      url: PropTypes.string,
    }),
    payment: PropTypes.shape({
      method: PropTypes.string,
      paid_amount: PropTypes.number,
      net_amount: PropTypes.number,
      cost_amount: PropTypes.number,
      refund_amount: PropTypes.number,
      installments: PropTypes.number,
    }),
    acquirer: PropTypes.shape({
      name: PropTypes.string,
      response_code: PropTypes.string,
      sequence_number: PropTypes.number,
      transaction_id: PropTypes.number,
    }),
    antifraud: PropTypes.object, // eslint-disable-line
    customer: PropTypes.shape({
      name: PropTypes.string,
      document_number: PropTypes.string,
      document_type: PropTypes.string,
      email: PropTypes.string,
      birth_date: PropTypes.string,
      country: PropTypes.string,
      phones: PropTypes.arrayOf(PropTypes.string),
    }),
    card: PropTypes.shape({
      brand_name: PropTypes.string,
      first_digits: PropTypes.string,
      holder_name: PropTypes.string,
      international: PropTypes.bool,
      last_digits: PropTypes.string,
      pin_mode: PropTypes.string,
    }),
    metadata: PropTypes.object, // eslint-disable-line
    operations: PropTypes.arrayOf(PropTypes.shape({
      created_at: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
      cycle: PropTypes.number,
    })),
    recipients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
      net_amount: PropTypes.number,
      liabilities: PropTypes.arrayOf(PropTypes.string),
      installments: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number,
        payment_date: PropTypes.instanceOf(moment),
        original_payment_date: PropTypes.instanceOf(moment),
        created_at: PropTypes.instanceOf(moment),
        amount: PropTypes.number,
        net_amount: PropTypes.number,
        costs: PropTypes.shape({
          mdr: PropTypes.number,
          anticipation: PropTypes.number,
        }),
      })),
    })),
  }).isRequired,
  transactionDetailsLabels: PropTypes.shape({
    acquirer_name: PropTypes.string,
    acquirer_response_code: PropTypes.string,
    authorization_code: PropTypes.string,
    capture_method: PropTypes.string,
    nsu: PropTypes.string,
    soft_descriptor: PropTypes.string,
    subscription_id: PropTypes.string,
    tid: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  metadataTitle: PropTypes.string.isRequired,
}

TransactionDetails.defaultProps = {
  onDismissAlert: null,
  onCopyBoletoUrl: null,
  onShowBoleto: null,
}

export default TransactionDetails
