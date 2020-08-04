import MappingHelper from "../../Mapper/MappingHelper";
import Model from "../../Model";


export default (): PropertyDecorator => {
    return (target: Object, propertyKey: string | symbol): void => {
        MappingHelper.getObjectMapping(<Model>target).setIdField(
            <string>propertyKey
        )
    };
}