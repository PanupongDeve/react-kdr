import BaseValidator from './BaseValidator';

export default class ColorsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(color) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(color.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(color.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}