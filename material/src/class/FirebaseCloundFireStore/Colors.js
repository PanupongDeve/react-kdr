import Model from './Model';
import ColorsDTO from '../DataHelper/DTO/ColorsDTO';
import ColorsOTS from '../DataHelper/ObjectToStore/ColorsOTS';

class Colors extends Model {
    constructor() {
        super();
        this.collection = 'Colors';
        this.dto = ColorsDTO;
        this.ots = ColorsOTS;
    }
}

export default new Colors();