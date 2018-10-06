import BaseService from './BaseService';
import ProductsDTO from '../DataHelper/DTO/ProductsDTO';
import ProductsOTS from '../DataHelper/ObjectToStore/ProductsOTS';
import ProductsValidator from '../Validator/ProductsValidator';

class ProductsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = ProductsDTO;
        this.ots = ProductsOTS;
    }
    
    getProductsValidator() {
        return new ProductsValidator();
    }
}

export default new ProductsService('api/products');