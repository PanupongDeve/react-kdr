
import BaseDTO from './BaseDTO';

class ColorsDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
            documentId: data.documentId,
            id: data.id,
            code: data.code,
            title: data.title
        }
    }

    
}

export default new ColorsDTO();