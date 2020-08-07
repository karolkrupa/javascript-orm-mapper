import Type from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import ModelMapper from "../Mapper/ModelMapper";
import MappingMode from "../Mapper/MappingMode";
import Model from "../Model";

export class ManyToOneType extends Type {
    private entityName: string = null

    constructor(modelName: string) {
        super();

        this.entityName = modelName
    }

    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        let newData = this.normalize(data)

        if(!entity[field]) {
            entity[field] = newData
        }else if(mappingMode == MappingMode.INSERT && !newData) {
            return
        }else if (mappingMode == MappingMode.CREATE) {
            entity[field] = newData
        }
    }

    public normalize(data: any): any {
        if(typeof data === 'string') return null
        if(data === undefined) return null
        if(data === null) return null
        let database = this.getDatabase()

        let model = database.getModel(this.entityName);

        let idField = MappingHelper.getObjectIdFieldName(model)

        let entity = null
        if(data[idField]) {
            entity = database.getById(model, data[idField])
        }

        if(!entity) {
            entity = ModelMapper.persistData(data, model)
        }else {
            ModelMapper.map(data, entity)
        }

        return entity;
    }
}

export default (entityName: string): PropertyDecorator => {
    let type = new ManyToOneType(entityName)

    return MappingHelper.getTypeDecorator(type)
}