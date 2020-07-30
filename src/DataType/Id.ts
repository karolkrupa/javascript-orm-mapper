import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import Model from "../Model";
import MappingMode from "../Mapper/MappingMode";

export class IdType extends Type {
    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        entity[field] = this.normalize(data)
    }

    normalize(data: any): any {
        return data.toString();
    }
}


export default (): PropertyDecorator => {
    let type = new IdType()

    return MappingHelper.getTypeDecorator(type)
}