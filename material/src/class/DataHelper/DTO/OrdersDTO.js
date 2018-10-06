
import BaseDTO from './BaseDTO';

class OrdersDTO extends BaseDTO {
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

    

    searchFilter(searchWord, orders) {
        
        return orders.filter((order) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(order.createdAt);
            let updatedAt = this.showTimesDisplay(order.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(order.id)
                ||new RegExp(searchWord.toLowerCase()).test(order.code.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(order.title.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new OrdersDTO();