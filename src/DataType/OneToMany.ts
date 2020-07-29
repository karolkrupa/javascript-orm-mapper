import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import ModelMapper from "../Mapper/ModelMapper";

export class OneToMany extends Type {
    private entityName: string = null

    constructor(entityName: string) {
        super();

        this.entityName = entityName
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
                entity = ModelMapper.persist(entityData, model)
            }
            returnArray.push(entity)
        }

        return returnArray;
    }
}

export default (entityName: string): PropertyDecorator => {
    let type = new OneToMany(entityName)

    return MappingHelper.getTypeDecorator(type)
}