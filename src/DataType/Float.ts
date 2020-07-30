import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";

class FloatType extends Type {
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