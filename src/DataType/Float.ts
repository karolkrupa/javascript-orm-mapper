import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import Model from "../Model";
import MappingMode from "../Mapper/MappingMode";

class FloatType extends Type {
    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        entity[field] = this.normalize(data)
    }

    normalize(data: any): any {
        let number = parseFloat(data)
        if(isNaN(number)) return null;
        return number
    }
}


export default (): PropertyDecorator => {
    let type = new FloatType()

    return MappingHelper.getTypeDecorator(type)
}