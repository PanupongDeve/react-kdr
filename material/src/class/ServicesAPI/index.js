import Colors from './ColorsService';
import Users from './๊UsersService';
import Sizes from './SizesService';
import Storage from '../Storage'

class ServiceModel {
    constructor() {
        this.storage = new Storage();
        this.colors = Colors;
        this.users = Users;
        this.sizes = Sizes;
    }

}

export default new ServiceModel();