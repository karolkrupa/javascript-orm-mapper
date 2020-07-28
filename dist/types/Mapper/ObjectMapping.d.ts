import { Type } from "../DataType/Type";
export default class ObjectMapping {
    private fields;
    private idField;
    addField(name: string, type: Type): void;
    getFieldType(name: string): Type | null;
    getFields(): {
        [key: string]: Type;
    };
    getIdField(): string;
}
