import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";

export class IdType extends Type {
    normalize(data: any): any {
        return data.toString();
    }
}


export default (): PropertyDecorator => {
    let type = new IdType()

    return MappingHelper.getTypeDecorator(type)
}