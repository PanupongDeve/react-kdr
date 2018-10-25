import BaseValidator from './BaseValidator';

export default class ModelsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(model) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(model.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(model.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(model.groupId, "Group")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}