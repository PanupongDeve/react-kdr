
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
        if(!field) {
            return false;
        }
        if(! (this.isNumberPlus(field)) ) {
            return `😿 ${fieldName} is positive integer.`;
        }
        return false;
    }

    isNotImageFile(file) {
        const { name } = file;
        let typeFile = name.substring(name.lastIndexOf('.')+1).toLowerCase();
        if (typeFile === "gif" || typeFile === "png" || typeFile === "bmp"|| typeFile === "jpeg" || typeFile === "jpg") return false;
        else return `😿 ${name} is image type.`;
    }
}