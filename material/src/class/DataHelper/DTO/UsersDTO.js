
import BaseDTO from './BaseDTO';

class UsersDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        data = this.filterNull(data);
        return {
            id: data.id,
            name: data.name,
            username: data.username,
            address: data.address,
            tel: data.tel,
            group: data.group

        }
    }

    

    searchFilter(searchWord, users) {
        
        return users.filter((user) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(user.createdAt);
            let updatedAt = this.showTimesDisplay(user.updatedAt);
            return (
                new RegExp(searchWord.toLowerCase()).test(user.id)
                ||new RegExp(searchWord.toLowerCase()).test(user.name.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(user.username.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(user.address.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(user.tel)
                || new RegExp(searchWord.toLowerCase()).test(user.group.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new UsersDTO();