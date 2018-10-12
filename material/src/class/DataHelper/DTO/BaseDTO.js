import * as moment  from 'moment-timezone';

export default class BaseDTO {
    moment(timestamp) {
        return moment(timestamp).tz("Asia/Bangkok");
    }

    getSoftDelte(data) {
        return {
            softDelete: data.softDelete
        }
    }

    getTimeStamp(data) {
        return {
            createdAt: this.toMilliSecond(data.createdAt),
            updatedAt: this.toMilliSecond(data.updatedAt)
            // deletedAt: this.toMilliSecond(data.deletedAt || '-')
        }
    }

    getObject(data) {
        return Object.assign(this.getFieldObject(data), this.getTimeStamp(data), this.getSoftDelte(data));
    }

    getArrayObject(datas) {
        return datas.map(data => {
            return this.getObject(data);
        })
    }

    filterDataActive(datas) {
        return datas.filter((data) => data.softDelete === false);
    }

    filterNull(data) {
        let result = data;
        for (let key in result) {
            
            if (result[key] === null) {
                result[key] = "-"
            }
        }
       
        return result;
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

    filterIsHaveData(data) {
        let result = {};
        for (let key in data) {    
            if (data[key]) {
                result[key] = data[key]
            }
        }
        
        return result;
    }

    filterIsHaveDataForUpdate(data) {
        let result = {};
        for (let key in data) {    
            if (data[key] && data[key] !== "-") {
                result[key] = data[key]
            }
        }
        return result;
    }

    
}