import {Type} from "./Type";
import MappingHelper from "../Mapper/MappingHelper";
import database from "../Database";
import ModelMapper from "../Mapper/ModelMapper";

export class ManyToOne extends Type {
    private entityName: string = null

    constructor(modelName: string) {
        super();

        this.entityName = modelName
    }

    public normalize(data: any): any {
        let model = database.getModel(this.entityName);

        let idField = MappingHelper.getObjectIdFieldName(model)

        if(!data[idField]) return null;

        let entity = database.get(model, data[idField])

        if(!entity) {
            entity = ModelMapper.persist(data, model)
        }

        return entity;
    }
}

export default (entityName: string): PropertyDecorator => {
    let type = new ManyToOne(entityName)

    return MappingHelper.getTypeDecorator(type)
}