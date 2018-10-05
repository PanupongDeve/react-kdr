import BaseValidator from './BaseValidator';

export default class GroupsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(group) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(group.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(group.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}