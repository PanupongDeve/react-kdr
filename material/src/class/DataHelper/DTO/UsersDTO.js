
import BaseDTO from './BaseDTO';

class UsersDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
           
        }
    }

    

    searchFilter(searchWord, colors) {
        
        // return colors.filter((color) => {
        //     searchWord = this.setBlackSlash(searchWord);
        //     let createdAt = this.showTimesDisplay(color.createdAt);
        //     let updatedAt = this.showTimesDisplay(color.updatedAt);
        //     return (
        //         new RegExp(searchWord.toLowerCase()).test(color.code.toLowerCase())
        //         || new RegExp(searchWord.toLowerCase()).test(color.title.toLowerCase())
        //         || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
        //         || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
        //     );
        // })
    }

    
}

export default new UsersDTO();