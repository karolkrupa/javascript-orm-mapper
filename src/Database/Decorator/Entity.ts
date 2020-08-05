import MappingHelper from "../../Mapper/MappingHelper";
import Model from "../../Model";
import DatabaseInterface from "../DatabaseInterface";

type EntityConfiguration = {
    name: string,
    database: DatabaseInterface
}

export default function EntityName(config: EntityConfiguration): ClassDecorator {
    return (target: Object) => {
        MappingHelper.setEntityName(<Model>target, config.name)
        config.database.registerModel(<typeof Model>target)
        MappingHelper.setDatabase(<typeof Model>target, config.database)
    }
}