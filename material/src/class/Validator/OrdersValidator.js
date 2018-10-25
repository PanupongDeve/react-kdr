import BaseValidator from './BaseValidator';

export default class OrdersValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(order) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(order.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(order.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}