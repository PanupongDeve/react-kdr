
import BaseDTO from './BaseDTO';

class OrdersDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
            id: data.id,
            userId: data.userId,
            address: data.address,
            messager: data.messager,
            amount: data.amount,
            tel: data.tel,
            filePath: data.filePath
        }
    }

    

    searchFilter(searchWord, orders) {
        
        return orders.filter((order) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(order.createdAt);
            let updatedAt = this.showTimesDisplay(order.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(order.id)
                ||new RegExp(searchWord.toLowerCase()).test(order.userId)
                || new RegExp(searchWord.toLowerCase()).test(order.address.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(order.messager.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(order.amount)
                || new RegExp(searchWord.toLowerCase()).test(order.tel.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new OrdersDTO();