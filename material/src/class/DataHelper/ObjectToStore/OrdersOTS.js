import BaseOTS from './BaseOTS';

class OrdersOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_ORDERS: "fetch_orders",
            FETCH_ORDER: "fetch_order",
            CLEAR_ORDER: "clear_order"
        }
    }

    intialData() {
        return {
            orders: [],
            order: ''
        }
    }

}

export default new OrdersOTS();