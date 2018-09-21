
import BaseDTO from './BaseDTO';

class ColorsDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
            id: data.id,
            code: data.code,
            title: data.title
        }
    }

    getArrayObject(datas) {
        return datas.map(data => {
            return this.getObject(data);
        })
    }
}

export default new ColorsDTO();