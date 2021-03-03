import React, { FC } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'

import ErrorMessage from './ErrorMessage'
import NotFound from '../../Icons/NotFound'

const messages = defineMessages({
  invalidTitle: {
    id: 'store/order.error.invalid.title',
    defaultMessage: '',
  },
  invalidMessage: {
    id: 'store/order.error.invalid.message',
    defaultMessage: '',
  },
})

const InvalidError: FC = () => {
  return (
    <ErrorMessage
      icon={<NotFound />}
      errorId={messages.invalidTitle.id}
      messageId={messages.invalidMessage.id}
    >
      <Link to="/">
        <Button>
          <FormattedMessage id="store/go-to-home" />
        </Button>
      </Link>
    </ErrorMessage>
  )
}

export default InvalidError
