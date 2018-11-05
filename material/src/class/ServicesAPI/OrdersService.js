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
    
    getOrdersValidator() {
        return new OrdersValidator();
    }
}

export default new OrdersService('api/orders');