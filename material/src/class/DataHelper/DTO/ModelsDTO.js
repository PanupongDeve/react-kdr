
import BaseDTO from './BaseDTO';

class ModelsDTO extends BaseDTO {
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

    

    searchFilter(searchWord, models) {
        
        return models.filter((model) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(model.createdAt);
            let updatedAt = this.showTimesDisplay(model.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(model.id)
                ||new RegExp(searchWord.toLowerCase()).test(model.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(model.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new ModelsDTO();