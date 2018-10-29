

export default class ErrorHandleMessage {
    constructor() {
        this.errorMessage = "Sometinh with wrong";
    }

    setErrorMessage(errorMessage) {
        if(errorMessage && errorMessage.message === 'Network Error') {
            this.errorMessage = "Don't connect to server. Please try again."
        } else if (errorMessage === 'You dont have permission') {
            this.errorMessage = errorMessage;
        } else if (
            errorMessage 
            && errorMessage.response 
            && errorMessage.response.data 
            && errorMessage.response.data.result
            && typeof errorMessage.response.data.result === 'string') {

            this.errorMessage = errorMessage.response.data.result;
        } else if (
            errorMessage 
            && errorMessage.response 
            && errorMessage.response.data 
            && errorMessage.response.data.result
            && errorMessage.response.data.result.errors[0]
            && errorMessage.response.data.result.errors[0].message) {

            this.errorMessage = errorMessage.response.data.result.errors[0].message;
        }
    }

    getErrorMessage() {
        return this.errorMessage;
    }
}