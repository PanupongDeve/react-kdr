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

            messageErrorField = this.checkQtaAndDisCount(group, ['qtyA','discountA1', 'discountA2'], 'qtaA and discountA');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.checkQtaAndDisCount(group, ['qtyB','discountB1', 'discountB2'], 'qtaB and discountB');
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.checkQtaAndDisCount(group, ['qtyC','discountC1', 'discountC2'], 'qtaC and discountC');
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

    checkQtaAndDisCount(group, checklists, message) {
        let count = 0;
        checklists.forEach(checklist => {
            if (group[checklist] || group[checklist] === '0' || group[checklist] === 0) {
                count++;
            }
        });
        
        if (count > 0 && count < 3) {
            return `😿 ${message} must full input or empty data.`;
        }
    }
}