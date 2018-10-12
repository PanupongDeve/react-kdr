
import BaseDTO from './BaseDTO';

class GroupsDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
            id: data.id,
            code: data.code,
            title: data.title,
            discountA1: data.discountA1,
            discountA2: data.discountA2,
            discountB1: data.discountB1,
            discountB2: data.discountB2,
            discountC1: data.discountC1,
            discountC2: data.discountC2,
            qtyA: data.qtyA,
            qtyB: data.qtyB,
            qtyC: data.qtyC,
            mixedColor: data.mixedColor,
            mixedModel: data.mixedModel
        }
    }

    

    searchFilter(searchWord, groups) {
        
        return groups.filter((group) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(group.createdAt);
            let updatedAt = this.showTimesDisplay(group.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(group.id)
                ||new RegExp(searchWord.toLowerCase()).test(group.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(group.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new GroupsDTO();