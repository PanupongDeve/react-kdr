
import BaseDTO from './BaseDTO';

class ProductsDTO extends BaseDTO {
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

    

    searchFilter(searchWord, products) {
        
        return products.filter((product) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(product.createdAt);
            let updatedAt = this.showTimesDisplay(product.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(product.id)
                ||new RegExp(searchWord.toLowerCase()).test(product.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(product.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new ProductsDTO();