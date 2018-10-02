import moment from "moment";

export default class BaseDTO {
    
    getTimeStamp(data) {
        return {
            createdAt: this.showTimesDisapy(data.createdAt),
            updatedAt: this.showTimesDisapy(data.updatedAt),
            deletedAt: this.showTimesDisapy(data.deletedAt || '-')
        }
    }

    getObject(data) {
        return Object.assign(this.getFieldObject(data), this.getTimeStamp(data));
    }

    getArrayObject(datas) {
        return datas.map(data => {
            return this.getObject(data);
        })
    }

    showTimesDisapy(date) {
        return moment(date).format("DD/MM/YYYY, h:mm:ss a");
    }

    
}