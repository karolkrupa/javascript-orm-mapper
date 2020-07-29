import {Type} from "../DataType/Type";
import {IdType} from "../DataType/Id";
import DatabaseInterface from "../Database/DatabaseInterface";

export default class ObjectMapping {
    private entityName: string = null

    private fields: { [key: string]: Type } = {}

    private idField: string = null

    private database: DatabaseInterface = null

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

    public getEntityName(): string {
        return this.entityName
    }

    public setEntityName(name: string) {
        this.entityName = name
    }

    public getDatabase(): DatabaseInterface {
        return this.database
    }

    public setDatabase(database: DatabaseInterface) {
        this.database = database
    }
}