import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import Model from "../Model";
import MappingMode from "../Mapper/MappingMode";

class IntegerType extends Type {
    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        entity[field] = this.normalize(data)
    }

    normalize(data: any): any {
        let number = parseInt(data)
        if(isNaN(number)) return null;
        return number
    }
}


export default (): PropertyDecorator => {
    let type = new IntegerType()

    return MappingHelper.getTypeDecorator(type)
}