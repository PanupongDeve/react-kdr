import Colors from './ColorsService';
import Users from './๊UsersService';
import Sizes from './SizesService';
import Groups from './GroupsService';
import Products from './ProductsService';
import Orders from './OrdersService';
import Models from './ModelService';
import Storage from '../Storage';


class ServiceModel {
    constructor() {
        this.storage = new Storage();
        this.colors = Colors;
        this.users = Users;
        this.sizes = Sizes;
        this.groups = Groups;
        this.products = Products;
        this.orders = Orders;
        this.models = Models;
    }

}

export const ServerURL = "http://localhost:3003";

export default new ServiceModel();