
export default class BaseDTO {
   
    getTimeStamp(data) {
        return {
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt || '-'
        }
    }

    getObject(data) {
        return Object.assign(this.getFieldObject(data), this.getTimeStamp(data));
    }
}