import BaseOTS from './BaseOTS';

class ProductsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_PRODUCTS: "fetch_products",
            FETCH_PRODUCT: "fetch_product",
            CLEAR_PRODUCT: "clear_product"
        }
    }

    intialData() {
        return {
            products: [],
            product: ''
        }
    }

}

export default new ProductsOTS();