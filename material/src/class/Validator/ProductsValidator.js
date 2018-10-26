import BaseValidator from './BaseValidator';

export default class ProductsValidator extends BaseValidator {
    constructor() {
        super();
    }

    validateFile(file) {
        try {
            let messageErrorField = this.isNotImageFile(file);
            if(messageErrorField) this.messageError.push(messageErrorField);
            if(this.messageError.length !== 0) {
                throw this.messageError;
            }
            
        } catch (error) {
            throw error;
        }
    }

    validate(product) {
        try {
            let messageErrorField;

            messageErrorField = this.isRequired(product.price, "Price")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(product.price, "Price")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(product.priceA, "PriceA")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isValidateNumber(product.priceB, "PriceB")
            if(messageErrorField) this.messageError.push(messageErrorField);
        
            messageErrorField = this.isRequired(product.groupId, "Group")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(product.modelId, "Model")
            if(messageErrorField) this.messageError.push(messageErrorField);

            messageErrorField = this.isRequired(product.sizeId || product.colorId, "Color or Size")
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