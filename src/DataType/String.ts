import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";

class StringType extends Type {
    normalize(data: any): any {
        return data.toString();
    }
}


export default (): PropertyDecorator => {
    let type = new StringType()

    return MappingHelper.getTypeDecorator(type)
}