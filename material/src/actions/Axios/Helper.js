import ErrorHandleMessage from '../../class/ErrorHandleMessage';

export const handleMessageError = (error) => {
    const errorHandleMessage = new ErrorHandleMessage();
    errorHandleMessage.setErrorMessage(error);
    const errorMessage = errorHandleMessage.getErrorMessage();
    return errorMessage;
}