import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import Model from "../Model";
import MappingMode from "../Mapper/MappingMode";

class BooleanType extends Type {
    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        entity[field] = this.normalize(data)
    }

    normalize(data: any): any {
        return !!data
    }
}


export default (): PropertyDecorator => {
    let type = new BooleanType()

    return MappingHelper.getTypeDecorator(type)
}