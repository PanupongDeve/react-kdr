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

            messageErrorField = this.isValidateNumber(group.discountA1, 'discountA1');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.discountA1, 'discountA2');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.discountB1, 'discountB1');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.discountB2, 'discountB2');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.discountC2, 'discountC1');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.discountC2, 'discountC2');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.qtyA, 'qtyA');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.qtyB, 'qtyB');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(group.qtyC, 'qtyC');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.checkBoxneedOneSelected(group, "CheckBox")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }

    checkBoxneedOneSelected(group, fieldName) {
        if((group.mixedColor === false) && (group.mixedModel === false)) {
            return `😿 ${fieldName} must one seleced.`;
        }
    }
}