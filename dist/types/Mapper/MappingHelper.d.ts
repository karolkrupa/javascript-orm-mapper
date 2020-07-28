import ObjectMapping from "./ObjectMapping";
import { Type } from "../DataType/Type";
import Model from "../Model";
export default class MappingHelper {
    static addFieldMapping(target: Model, name: string, type: Type): void;
    static getFieldMapping(target: Model, name: string): Type | null;
    static getMappedFields(target: Model): {
        [key: string]: Type;
    };
    static getObjectMapping(target: Model): ObjectMapping;
    static getObjectId(target: Model): any;
    static getObjectIdFieldName(target: Model): string;
    static getTypeDecorator(type: Type): PropertyDecorator;
}
