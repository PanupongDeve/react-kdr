import BaseService from './BaseService';
import UsersGroupsValidator from '../Validator/UsersGroupsValidator';

class UsersGroupsService extends BaseService {
    constructor(domain) {
        super(domain)
    }
    
    getValidator() {
        return new UsersGroupsValidator();
    }

    getDTOClass() {

    }

    getOTSClass() {
        
    }


    // overide from baseService
    async remove(userId, groupId) {
      try {
        const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
        this.storage.saveToken(resToken.data.result.token);
        this.setAxiosConfig();
        // this code for delete data
        const res = await this.axios.delete(
          `${this.RootURL}/${this.domain}/${userId}/${groupId}`,
          this.config
        );
        return res.data.result;
      } catch (error) {
        if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
          this.storage.removeStorage();
          window.location.reload();
          return;
        }
        throw error;
      }
    }

    // overide from baseService
    async update(data) {
      try {
        const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
        this.storage.saveToken(resToken.data.result.token);
        this.setAxiosConfig();
        // this code for update data
        const res = await this.axios.patch(
          `${this.RootURL}/${this.domain}`,
          data,
          this.config
        );
        return res.data.result;
      } catch (error) {
        if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
          this.storage.removeStorage();
          window.location.reload();
          return;
        }
        throw error;
      }
    }
}

export default new UsersGroupsService('api/groups/users');