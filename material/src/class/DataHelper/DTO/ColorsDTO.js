
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

    searchFilter(searchWord, colors) {
        return colors.filter((color) => {
            return (
                new RegExp(searchWord.toLowerCase()).test(color.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(color.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(color.createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(color.updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new ColorsDTO();