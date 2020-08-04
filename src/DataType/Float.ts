import MappingHelper from "../Mapper/MappingHelper";
import Type from "./Type";

export class FloatType extends Type {
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