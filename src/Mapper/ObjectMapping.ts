import {Type} from "../DataType/Type";
import {IdType} from "../DataType/Id";
import DatabaseInterface from "../Database/DatabaseInterface";
import IdTypeAlreadyDeclaredError from "./Exception/IdTypeAlreadyDeclaredError";

export default class ObjectMapping {
    private entityName: string = null

    private fields: { [key: string]: Type } = {}

    private idField: string = null

    private database: DatabaseInterface = null

    public addField(name: string, type: Type) {
        if(type instanceof IdType) {
            if(this.idField !== null) {
                throw new IdTypeAlreadyDeclaredError('Id type on entity ' + this.entityName + ' already declared')
            }
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

    public getIdField(): string {
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