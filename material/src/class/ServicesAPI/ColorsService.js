import BaseService from './BaseService';
import ColorsDTO from '../DataHelper/DTO/ColorsDTO';
import ColorsOTS from '../DataHelper/ObjectToStore/ColorsOTS';

class ColorsService extends BaseService {
    constructor(domain) {
        super(domain)
        this.dto = ColorsDTO;
        this.ots = ColorsOTS;
    }   
}

export default new ColorsService('api/colors');