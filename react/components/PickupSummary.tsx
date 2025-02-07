import React, { FC } from 'react'
import estimateCalculator from '@vtex/estimate-calculator'
import { FormattedMessage } from 'react-intl'

import { useOrderGroup } from './OrderGroupContext'
import SummaryBox from './SummaryBox'

const PickupSummary: FC = (props) => {
  const { totalPickUpParcels } = useOrderGroup()

  if (totalPickUpParcels.length === 0) {
    return null
  }

  const pickUpItemsQuantity = totalPickUpParcels.reduce(
    (acc, pickupPackage) => acc + pickupPackage.items.length,
    0
  )

  const longestPickUpEstimate = estimateCalculator.getLatestSla(
    totalPickUpParcels
  )
  
  const shippingDetails = {
    shippingAddress: props.address,
    date_recieve: props.date,
    time_recieve :props.time
  }

  return (
    <SummaryBox
      type="pickup"
      title={<FormattedMessage id="store/summary.pickup" />}
      itemQuantity={
        <FormattedMessage
          id="store/summary.items"
          values={{ itemsQuantity: pickUpItemsQuantity }}
        />
      }
      parcelQuantity={
        <FormattedMessage
          id="store/summary.pickup.quantity"
          values={{ pickups: totalPickUpParcels.length }}
        />
      }
      shippingEstimate={longestPickUpEstimate.shippingEstimate}
      shippingAddress={
        <FormattedMessage
          id="store/summary.pickup.friendlyName"
          values={{
            friendlyName: totalPickUpParcels[0].pickupFriendlyName,
          }}
        />
      }
    />
  )
}

export default PickupSummary
