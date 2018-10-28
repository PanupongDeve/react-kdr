import BaseValidator from './BaseValidator';

export default class GroupsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(data) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(group.userId, "User")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(group.groupId, "Group")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(data.discountA, 'discountA');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(data.discountB, 'discountB');
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }

}