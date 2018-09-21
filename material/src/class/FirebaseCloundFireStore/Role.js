import Model from './Model';
import roleTypes from '../../enums/role';

class Role extends Model {
    constructor() {
        super();
        this.collection = 'Role';
    }

    async migrateRole() {
        const dataRoles = [
            { title: roleTypes.ADMIN },
            { title: roleTypes.CUSTOMER },
            { title: roleTypes.USER }
        ];
    

        await this.create(dataRoles[0]);
        await this.create(dataRoles[1]);
        await this.create(dataRoles[2]);
        
        console.log('STATUS ---> MIGRATE SUCCESS');
    }

    

}

export default new Role();