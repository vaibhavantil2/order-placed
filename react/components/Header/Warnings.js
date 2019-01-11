import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { getTotalParcelsFromOrderGroup, intlMessage, getPaymentGroupFromOrder } from '../../utils'
import Price from '../Payment/FormattedPrice'

const Warnings = ({ data, intl }) => {
  const {
    totalDeliveries,
    totalPickUps,
  } = getTotalParcelsFromOrderGroup(data)
  const orderWasSplit = (data.length > 1)
  const bankInvoices = data.reduce((acc, currOrder) => ([...acc, getPaymentGroupFromOrder(currOrder)]), []).filter(order => order.paymentGroup === 'bankInvoice')
  const hasBankInvoice = bankInvoices.length > 0
  const listItem = 'tc mv0 w-80-ns w-90 center c-on-base'
  const bottomBorder = 'b--muted-4 bb'

  return (
    <Fragment>
      <ul className="mt7 mb9 list ml0 pl0 t-body bg-muted-5 pv4 tc">
        <li className={`${listItem} ${bottomBorder}`}>
          <p className="pb2">
            { intlMessage(intl, 'warnings.payment.approval') }
          </p>
        </li>
        {totalDeliveries.length > 0 &&
          (
            <Fragment>
              <li className={`${listItem} ${bottomBorder}`}>
                <p className="pv2">
                  { intlMessage(intl, 'warnings.delivery.time') }
                </p>
              </li>
              <li className={`${listItem} ${((orderWasSplit || totalPickUps.length > 0) ? bottomBorder : '')}`}>
                <p className="pv2">
                  { intlMessage(intl, 'warnings.delivery.tracking') }
                </p>
              </li>
            </Fragment>
          )
        }
        {totalPickUps.length > 0 &&
          <li className={`${listItem} ${orderWasSplit ? bottomBorder : ''}`}>
            <p className="pt2">
              { intlMessage(intl, 'warnings.pickup.time') }
            </p>
          </li>
        }
        {orderWasSplit &&
          <li className={`${listItem} ${(hasBankInvoice ? bottomBorder : '')}`}>
            <p className="pt2">
              { intlMessage(intl, 'warnings.order.split', { numOrders: data.length }) }
            </p>
          </li>
        }
        {hasBankInvoice &&
          (
            <Fragment>
              <li className={`${listItem} ${bottomBorder}`}>
                <p className="pv2">
                  { intlMessage(intl, 'warnings.payment.bankInvoice.approval') }
                </p>
              </li>
              <li className={listItem}>
                <div className="pt2 pb3">
                  <p>
                    <FormattedMessage
                      id={'warnings.payment.bankInvoice.value'}
                      values={{
                        paymentValue: (
                          <strong><Price value={bankInvoices[0].value} /></strong>
                        ),
                        paymentDueDate: (
                          <strong>Due date</strong>
                        ),
                      }}
                    />
                  </p>
                  <Button variation="primary">
                    { intlMessage(intl, 'payments.bankinvoice.print') }
                  </Button>
                </div>
              </li>
            </Fragment>
          )
        }
      </ul>
    </Fragment>
  )
}

Warnings.propTypes = {
  data: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(Warnings)
