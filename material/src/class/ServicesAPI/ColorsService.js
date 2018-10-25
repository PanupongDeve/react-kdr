import BaseService from './BaseService';
import ColorsDTO from '../DataHelper/DTO/ColorsDTO';
import ColorsOTS from '../DataHelper/ObjectToStore/ColorsOTS';
import ColorsValidator from '../Validator/ColorsValidator';

class ColorsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = ColorsDTO;
        this.ots = ColorsOTS;
    }
    
    getColorsValidator() {
        return new ColorsValidator();
    }
}

export default new ColorsService('api/colors');