import MappingHelper from "../Mapper/MappingHelper";
import Type from "./Type";

export class StringType extends Type {
    normalize(data: any): any {
        return data.toString();
    }
}


export default (): PropertyDecorator => {
    let type = new StringType()

    return MappingHelper.getTypeDecorator(type)
}