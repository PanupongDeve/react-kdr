import BaseValidator from './BaseValidator';

export default class ProductsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validate(product) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(product.code, "Code")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(product.title, "Title")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(product.price, "Price")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(product.price, "Price")
            if(messageErrorField) this.messageError.push(messageErrorField);
        
            messageErrorField = this.isRequired(product.groupId, "Group")
            if(messageErrorField) this.messageError.push(messageErrorField);

            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
        } catch (error) {
            throw error;
        }
    }
}


// code, title, price, groupId, sizeId, colorId