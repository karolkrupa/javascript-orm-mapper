import MappingHelper from "../Mapper/MappingHelper";
import Type from "./Type";

export class BooleanType extends Type {
    normalize(data: any): any {
        if(data === 'false') return false
        if(data === 'true') return true
        if(data === '0') return false
        if(data === '1') return true
        return !!data
    }
}


export default (): PropertyDecorator => {
    let type = new BooleanType()

    return MappingHelper.getTypeDecorator(type)
}