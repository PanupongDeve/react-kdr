import BaseService from './BaseService';
import UsersDTO from '../DataHelper/DTO/UsersDTO';
import UsersOTS from '../DataHelper/ObjectToStore/UsersOTS';

class UsersService extends BaseService {
    constructor(domain) {
        super(domain);
        this.dto = UsersDTO;
        this.ots = UsersOTS;
    }   

    async authentication(data) {
        try {
            const res = await this.axios.post(
              `${this.RootURL}/api/authentication`,
              data
            );
            return res.data.result;
          } catch (error) {
            throw error;
          }
    }

}

export default new UsersService('api/users');