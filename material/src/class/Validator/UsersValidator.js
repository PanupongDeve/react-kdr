import BaseValidator from './BaseValidator';

export default class UsersValidator extends BaseValidator {
    constructor() {
        super();
    }

    validateCreate(user) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(user.name, "Name")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(user.username, "username")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(user.password, "password")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }

    validateUpdate(user) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(user.name, "Name")
            if(messageErrorField) this.messageError.push(messageErrorField);


            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}