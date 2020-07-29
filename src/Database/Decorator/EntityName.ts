import MappingHelper from "../../Mapper/MappingHelper";
import Model from "../../Model";

export default function EntityName(entityName: string): ClassDecorator {
    return (target: Object) => {
        MappingHelper.setEntityName(<Model>target, entityName)
    }
}