import ObjectMapping from "./ObjectMapping";
import {Type} from "../DataType/Type";
import Model from "../Model";

export default class MappingHelper {
    static addFieldMapping(target: Model, name: string, type: Type) {
        this.getObjectMapping(target).addField(name, type)
    }

    static getFieldMapping(target: Model, name: string): Type | null {
        return this.getObjectMapping(target).getFieldType(name)
    }

    static getMappedFields(target: Model): { [key: string]: Type } {
        return this.getObjectMapping(target).getFields()
    }

    static getObjectMapping(target: Model): ObjectMapping {
        // If model provided
        if(target['orm']) return target['orm']

        // If entity provided
        if(!target.constructor['orm']) {
            target.constructor['orm'] = new ObjectMapping()
        }

        return target.constructor['orm']
    }

    static getObjectId(target: Model) {
        let idField = this.getObjectMapping(target).getIdField()

        if(!idField) return null

        return target[idField]
    }

    static getObjectIdFieldName(target: Model) {
        return this.getObjectMapping(target).getIdField()
    }

    static getTypeDecorator(type: Type): PropertyDecorator {
        return (target: Object, propertyKey: string | symbol): void => {
            MappingHelper.getObjectMapping(target).addField(
                <string>propertyKey,
                type
            )
        };
    }
}