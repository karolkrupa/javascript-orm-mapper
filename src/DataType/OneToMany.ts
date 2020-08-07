import Type from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import ModelMapper from "../Mapper/ModelMapper";
import Model from "../Model";
import MappingMode from "../Mapper/MappingMode";

export class OneToManyType extends Type {
    private entityName: string = null

    constructor(entityName: string) {
        super();

        this.entityName = entityName
    }

    public map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        let newData = this.normalize(data)

        if(mappingMode == MappingMode.INSERT) {
            if(!entity[field]) {
                entity[field] = newData
            }

            if(newData.length > 0) {
                entity[field] = this.mergeEntitiesArray(newData, entity[field])
            }
        }else if(mappingMode == MappingMode.CREATE) {
            entity[field] = newData
        }
    }

    protected mergeEntitiesArray(newData: any[], oldData: any[]) {
        let merged = [...oldData]

        for(let item of newData) {
            if(oldData.indexOf(item) < 0) {
                merged.push(item)
            }
        }

        return merged
    }

    public normalize(data: any): any {
        let database = this.getDatabase();

        let model = database.getModel(this.entityName);
        let idField = MappingHelper.getObjectIdFieldName(model)

        if(!Array.isArray(data)) return [];

        let returnArray = []
        for (let entityData of data) {
            let entity = database.getById(model, entityData[idField])
            if(!entity) {
                entity = ModelMapper.persistData(entityData, model)
            }
            returnArray.push(entity)
        }

        return returnArray;
    }
}

export default (entityName: string): PropertyDecorator => {
    let type = new OneToManyType(entityName)

    return MappingHelper.getTypeDecorator(type)
}