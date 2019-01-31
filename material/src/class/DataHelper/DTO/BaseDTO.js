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
        if(!datas) return [];
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
        return this.moment(date).format("DD/MM/YYYY");
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

    transformToBoolean(field) {
        if(field === 'true' || field === true) {
            return true;
        } else if (field === 'false' || field === false) {
            return false;
        }
    }

    deleteEmptyField(object, fields) {
        fields.map(field => {
            if(!object[field]) {
                delete object[field];
            }
            return field;
        })
    }

    assigneNullInEmptyField(object, fields) {
        fields.map(field => {
            if(object[field] === "") {
                object[field] = null;
            }
            return field;
        })
    }

    assignNullInZeroFields(object, fields) {
        let count = this.countDataIsZero(object, fields);
        if (count === 3) {
            fields.forEach(field => {
                object[field] = null;
            });  
        }
    }

    countDataIsZero(object, fields) {
        let count = 0;
        fields.forEach(field => {
            if (object[field] === '0') {
                count++;
            }
        });
        
        return count;
    }

    setDefaultDecimal(object, fields) {
        fields.map(field => {
            if(!object[field]) {
                object[field] = 0;
            }
            return field;
        })
    }

    createMarkEmptyData(field) {
        if(!field) {
            return '-'
        } else {
            return field;
        }
    }

    
}