import BaseService from './BaseService';


class CatService extends BaseService {
    constructor(domain) {
        super(domain)
    }
    
}

export default new CatService('cats');