import Type from "./Type";
import MappingHelper from "../Mapper/MappingHelper";

export class IntegerType extends Type {
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