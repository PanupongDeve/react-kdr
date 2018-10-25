import BaseValidator from './BaseValidator';

export default class SizesValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(size) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(size.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(size.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}