import BaseService from './BaseService';
import OrdersDTO from '../DataHelper/DTO/OrdersDTO';
import OrdersOTS from '../DataHelper/ObjectToStore/OrdersOTS';
import OrdersValidator from '../Validator/OrdersValidator';

class OrdersService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = OrdersDTO;
        this.ots = OrdersOTS;
    }
    
    getOrdersValidator() {
        return new OrdersValidator();
    }
}

export default new OrdersService('api/orders');