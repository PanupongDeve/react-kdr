
import BaseDTO from './BaseDTO';

class SizesDTO extends BaseDTO {
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

    

    searchFilter(searchWord, sizes) {
        
        return sizes.filter((size) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(size.createdAt);
            let updatedAt = this.showTimesDisplay(size.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(size.id)
                ||new RegExp(searchWord.toLowerCase()).test(size.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(size.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new SizesDTO();