import BaseService from './BaseService';
import SizesDTO from '../DataHelper/DTO/SizesDTO';
import SizesOTS from '../DataHelper/ObjectToStore/SizesOTS';
import SizesValidator from '../Validator/SizesValidator';

class SizesService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = SizesDTO;
        this.ots = SizesOTS;
    }
    
    getSizesValidator() {
        return new SizesValidator();
    }
}

export default new SizesService('api/sizes');