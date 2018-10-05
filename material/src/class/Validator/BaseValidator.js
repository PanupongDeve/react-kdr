
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
}