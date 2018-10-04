
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

    

    searchFilter(searchWord, colors) {
        
        return colors.filter((color) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(color.createdAt);
            let updatedAt = this.showTimesDisplay(color.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(color.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(color.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt)
                || new RegExp(searchWord.toLowerCase()).test(updatedAt)
            );
        })
    }

    
}

export default new ColorsDTO();