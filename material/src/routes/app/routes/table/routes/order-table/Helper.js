import * as moment  from 'moment-timezone';


const serverURL = 'https://kd-api.palmfuture.space';
const momentTH = (timestamp) => {
    return moment(timestamp).tz("Asia/Bangkok");
}

export const generatePathPO = (pathPO) => {
    if (pathPO === '//none') {
        return pathPO;
    } else {
        return `${serverURL}/${pathPO}`;
    }
}

export const selectPDFicon = (pathPO) => {
    if (pathPO === '//none') {
        return 'red';
    } else {
        return 'green';
    }
}

export const generateDiscount = (discount) => {
    if (discount) {
        return discount;
    } else {
        return '0'
    }
}

export const showTimesDisplay = (date) => {
    return momentTH(date).format("DD/MM/YYYY");
}

export const setBlackSlash = (string) => {
    const invalid = /[°"§%()\[\]{}=\\?´`'#<>|\*,;.:+_-]+/g;
    return string.replace(invalid, "\\\\"); 
}

export const searchTable = (searchWord, orders) => {
        
    return orders.filter((order) => {
        searchWord = setBlackSlash(searchWord);
        let createdAt = showTimesDisplay(order.createdAt);
        return (
            new RegExp(searchWord.toLowerCase()).test(order.invoice.toLowerCase())
            || new RegExp(searchWord.toLowerCase()).test(order.amount)
            || new RegExp(searchWord.toLowerCase()).test(order.discount)
            || new RegExp(searchWord.toLowerCase()).test(order.user.name.toLowerCase())
            || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
        );
    })
}