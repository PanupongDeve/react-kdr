import BaseService from './BaseService';
import UsersDTO from '../DataHelper/DTO/UsersDTO';
import UsersOTS from '../DataHelper/ObjectToStore/UsersOTS';
import UsersValidator from '../Validator/UsersValidator';

class UsersService extends BaseService {
    constructor(domain) {
        super(domain);
        this.dto = UsersDTO;
        this.ots = UsersOTS;
    }
    getUsersValidator() {
        return new UsersValidator();
    }

    async get() {
        try {
          const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
          this.storage.saveToken(resToken.data.result.token);
          this.setConfig();
          const res = await this.axios.get(
            `${this.RootURL}/${this.domain}`,
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
      async getById(id) {
        try {
          const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
          this.storage.saveToken(resToken.data.result.token);
          this.setConfig();
          const res = await this.axios.get(
            `${this.RootURL}/${this.domain}/${id}`,
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