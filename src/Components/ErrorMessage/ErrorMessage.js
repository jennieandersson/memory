import React from 'react'
import { ReactComponent as Error } from '../../images/error.svg'

function ErrorMessage(props) {

  const { errorCode } = props;

  function getErrorMessage() {
      switch(errorCode) {
          case 'highscore-list-get-fail':
              return 'Failed to retrieve high score list.';
          case 'name-required':
              return 'You need to enter a name';
          default:
              return 'Oops, something went wrong.';
      }
  }

  return errorCode ? <p className="error"><Error />{getErrorMessage()}</p> : null;
}

export default ErrorMessage