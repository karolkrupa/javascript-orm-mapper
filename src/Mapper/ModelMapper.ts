import Model from "../Model";
import MappingHelper from "./MappingHelper";

export default class ModelMapper {
    static map(data: {}, model: Model) {
        let fields = MappingHelper.getMappedFields(model)

        for(let field in fields) {
            if(data[field]) {
                model[field] = fields[field].normalize(data[field])
            }
        }
    }

    static persist(data: {}, model: typeof Model) {
        let entity = new (model)()
        let idFieldName = MappingHelper.getObjectIdFieldName(entity)

        if(data[idFieldName]) {
            entity[idFieldName] = data[idFieldName]
        }

        MappingHelper.getDatabase(model).persist(entity)

        this.map(data, entity)

        return entity
    }
}