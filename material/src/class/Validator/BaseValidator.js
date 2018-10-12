
export default class BaseValidator {
    constructor() {
        this.messageError = [];
    }

    isRequired(field, fieldName) {
        if(!field) {
            return `😿 ${fieldName} is required.`;
        }
        return false;
    }

    isNumberPlus(field) {
        let number = Number(field);
        return (number >= 0) ? true: false;
    }

    isNumberFromString(field) {
        const reg = new RegExp(/^\d+$/);
        return reg.test(field);
    }

    isValidateNumber(field, fieldName) {
        if(! (this.isNumberPlus(field)) ) {
            return `😿 ${fieldName} is positive integer.`;
        }
        return false;
    }
}