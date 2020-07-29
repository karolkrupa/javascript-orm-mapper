import ObjectMapping from "./ObjectMapping";
import {Type} from "../DataType/Type";
import Model from "../Model";
import DatabaseInterface from "../Database/DatabaseInterface";

export default class MappingHelper {
    static setDatabase(target: Model | typeof Model, database: DatabaseInterface) {
        this.getObjectMapping(target).setDatabase(database)
    }

    static getDatabase(target: Model | typeof Model): DatabaseInterface {
        return this.getObjectMapping(target).getDatabase()
    }

    static setEntityName(target: Model | typeof Model, name: string) {
        this.getObjectMapping(target).setEntityName(name)
    }

    static getEntityName(target: Model | typeof Model): string {
        return this.getObjectMapping(target).getEntityName()
    }

    static addFieldMapping(target: Model | typeof Model, name: string, type: Type) {
        this.getObjectMapping(target).addField(name, type)
    }

    static getFieldMapping(target: Model | typeof Model, name: string): Type | null {
        return this.getObjectMapping(target).getFieldType(name)
    }

    static getMappedFields(target: Model | typeof Model): { [key: string]: Type } {
        return this.getObjectMapping(target).getFields()
    }

    static getObjectMapping(target: Model | typeof Model): ObjectMapping {
        // If model provided
        if(target['orm']) return target['orm']

        // If entity provided
        if(!target.constructor['orm']) {
            target.constructor['orm'] = new ObjectMapping()
        }

        return target.constructor['orm']
    }

    static getObjectId(target: Model | typeof Model) {
        let idField = this.getObjectMapping(target).getIdField()

        if(!idField) return null

        return target[idField]
    }

    static getObjectIdFieldName(target: Model | typeof Model) {
        return this.getObjectMapping(target).getIdField()
    }

    static getTypeDecorator(type: Type): PropertyDecorator {
        return (target: Object, propertyKey: string | symbol): void => {
            type.setModel(<typeof Model>target)
            MappingHelper.getObjectMapping(<Model>target).addField(
                <string>propertyKey,
                type
            )
        };
    }
}