
import BaseDTO from './BaseDTO';

class ProductsDTO extends BaseDTO {
    constructor() {
        super();
    }

    getFieldObject(data) {
        return {
            id: data.id,
            code: data.code,
            title: data.title,
            groupId: data.groupId,
            modelId: data.modelId,
            colorId: data.colorId,
            sizeId: data.sizeId,
            imagePath: data.imagePath,
            price: data.price,
            priceA: data.priceA,
            priceB: data.priceB,
            remark: data.remark,
            color: data.color,
            group: data.group,
            size: data.size,
            model: data.model
        }
    }

    createCodeByColor(product) {
        const { group, model, color} = product;
        return `${group.code}.${model.code}.${color.code}`;
    } 

    createCodeBySize(product) {
        const { group, model, size} = product;
        return `${group.code}.${model.code}.${size.code}`;
    }

    createTitleByColor(product) {
        const { group, model, color} = product;
        return `${group.title} ${model.title} ${color.title}`;
    }
    
    createTitleBySize(product) {
        const { group, model, size} = product;
        return `${group.title} ${model.title} ${size.title}`;
    }
    

    searchFilter(searchWord, products) {
        
        return products.filter((product) => {
            searchWord = this.setBlackSlash(searchWord);
            let createdAt = this.showTimesDisplay(product.createdAt);
            let updatedAt = this.showTimesDisplay(product.updatedAt);
            const objectTitle = product.size ? this.createTitleBySize(product) : this.createTitleByColor(product);
            const objectCode = product.size ? this.createCodeBySize(product) : this.createCodeByColor(product);
            return (
                new RegExp(searchWord.toLowerCase()).test(product.id)
                ||new RegExp(searchWord.toLowerCase()).test(objectTitle.toLowerCase())
                ||new RegExp(searchWord.toLowerCase()).test(objectCode.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(createdAt.toLowerCase())
                || new RegExp(searchWord.toLowerCase()).test(updatedAt.toLowerCase())
            );
        })
    }

    
}

export default new ProductsDTO();