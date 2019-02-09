import ErrorHandleMessage from '../../class/ErrorHandleMessage';
import Storage from '../../class/Storage';

const getMessageError = (error) => {
    if (error
        && error.response 
        && error.response.data 
        && error.response.data.result
        && error.response.data.result.name === 'JsonWebTokenError') {
            const storage = new Storage();
            storage.removeStorage();
            window.location.reload();
    }
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