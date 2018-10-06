import BaseOTS from './BaseOTS';

class ProductsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_PRODUCTS: "fetch_products",
            FETH_PRODUCT: "fetch_product",
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