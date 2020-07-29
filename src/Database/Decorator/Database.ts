import Model from "../../Model";
import DatabaseInterface from "../DatabaseInterface";
import MappingHelper from "../../Mapper/MappingHelper";

export default function EntityName(database: DatabaseInterface): ClassDecorator {
    return (target: Object) => {
        database.registerModel(<typeof Model>target)
        MappingHelper.setDatabase(<typeof Model>target, database)
    }
}