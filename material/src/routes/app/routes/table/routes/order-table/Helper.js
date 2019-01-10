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