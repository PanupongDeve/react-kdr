import ErrorHandleMessage from '../../class/ErrorHandleMessage';

const getMessageError = (error) => {
    const errorHandleMessage = new ErrorHandleMessage();
    errorHandleMessage.setErrorMessage(error);
    const errorMessage = errorHandleMessage.getErrorMessage();
    return errorMessage;
}

export const handleMessageError = (error, errorAlertCallback, setMessageError) => {
    const errorMessage = getMessageError(error);
    setMessageError(errorMessage);
    setTimeout(() => {
        errorAlertCallback();
    }, 500);
}