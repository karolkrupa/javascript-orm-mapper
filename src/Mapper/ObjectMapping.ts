import {Type} from "../DataType/Type";
import {IdType} from "../DataType/Id";

export default class ObjectMapping {
    private fields: { [key: string]: Type } = {}

    private idField: string = null

    public addField(name: string, type: Type) {
        if(type instanceof IdType) {
            this.idField = name
        }
        this.fields[name] = type
    }

    public getFieldType(name: string): Type | null {
        if(!this.fields[name]) return null
        return this.fields[name]
    }

    public getFields(): { [key: string]: Type } {
        return this.fields
    }

    public getIdField() {
        return this.idField
    }
}