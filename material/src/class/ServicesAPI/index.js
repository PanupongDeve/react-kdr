import Colors from './ColorsService';
import Users from './๊UsersService';
import Sizes from './SizesService';
import Groups from './GroupsService';
import Products from './ProductsService';
import Storage from '../Storage'

class ServiceModel {
    constructor() {
        this.storage = new Storage();
        this.colors = Colors;
        this.users = Users;
        this.sizes = Sizes;
        this.groups = Groups;
        this.products = Products;
    }

}

export default new ServiceModel();