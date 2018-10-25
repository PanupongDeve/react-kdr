import BaseService from './BaseService';
import ModelsDTO from '../DataHelper/DTO/ModelsDTO';
import ModelsOTS from '../DataHelper/ObjectToStore/ModelsOTS';
import ModelsValidator from '../Validator/ModelsValidator';

class ModelsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = ModelsDTO;
        this.ots = ModelsOTS;
    }
    
    getModelsValidator() {
        return new ModelsValidator();
    }
}

export default new ModelsService('api/models');