import BaseService from './BaseService';
import ProductsDTO from '../DataHelper/DTO/ProductsDTO';
import ProductsOTS from '../DataHelper/ObjectToStore/ProductsOTS';
import ProductsValidator from '../Validator/ProductsValidator';

class ProductsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = ProductsDTO;
        this.ots = ProductsOTS;
    }
    
    getProductsValidator() {
        return new ProductsValidator();
    }

    //@overwrite
    setConfig() {
        this.config = {
          headers: {
            authorization: this.storage.getToken(),
            // 'Content-Type': 'multipart/form-data' 
          }
        };
      }

    async upload(data) {
        this.setConfig();
        let formData = new FormData();
        formData.append('image', data);
        try {
          const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
          this.storage.saveToken(resToken.data.result.token);
          this.setConfig();
          const res = await this.axios.post(
            `${this.RootURL}/${this.domain}/upload`,
            formData,
            this.config
          );

          let data = res.data.result
          
          return data;
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

export default new ProductsService('api/products');