import Model from "../Model";
import MappingHelper from "./MappingHelper";
import MappingMode from './MappingMode'

export default class ModelMapper {
    static map(data: {}, model: Model, mode: MappingMode = MappingMode.INSERT) {
        let fields = MappingHelper.getMappedFields(model)

        for(let field in fields) {
            if(data[field]) {
                fields[field].map(model, field, data[field], mode)
            }else if(data[field] === null) {
                model[field] = null
            }
        }
    }

    static persist(data: {}, model: typeof Model, mode: MappingMode = MappingMode.INSERT) {
        let entity = null
        let idFieldName = MappingHelper.getObjectIdFieldName(model)

        if(data[idFieldName]) {
            entity = MappingHelper.getDatabase(model).getById(model, data[idFieldName])

            if(!entity) {
                entity = new (model)()
                entity[idFieldName] = data[idFieldName]
                MappingHelper.getDatabase(model).persist(entity)
            }
        }else {
            entity = new (model)()
            MappingHelper.getDatabase(model).persist(entity)
        }

        this.map(data, entity, mode)

        return entity
    }

    static persistEntity(entity: Model) {
        MappingHelper.getDatabase(entity).persist(entity)

        return entity
    }
}