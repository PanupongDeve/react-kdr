import * as moment  from 'moment-timezone';

export default class BaseDTO {
    moment(timestamp) {
        return moment(timestamp).tz("Asia/Bangkok");
    }

    getTimeStamp(data) {
        return {
            createdAt: this.toMilliSecond(data.createdAt),
            updatedAt: this.toMilliSecond(data.updatedAt),
            deletedAt: this.toMilliSecond(data.deletedAt || '-')
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

    showTimesDisplay(date) {
        return this.moment(date).format("DD/MM/YYYY, h:mm:ss a");
    }

    toMilliSecond(date) {
        return this.moment(date).valueOf();
    }

    setBlackSlash(string) {
        return string.replace(new RegExp("\\\\", "g"), "\\\\"); 
    }

    
}