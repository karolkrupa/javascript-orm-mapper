import Model from "./Model";
import MappingHelper from "./Mapper/MappingHelper";

class Database {
    private models: { [name: string]: typeof Model } = {}

    private entites: {[key: string]: {[key: string]: Model}} = {}

    public register(model: typeof Model) {
        this.models[model.entity] = model
    }

    public getModel(entityName: string) {
        return this.models[entityName]
    }

    public getModels() {
        return this.models
    }

    public persist(entity: Model) {
        this.entites[entity.constructor['entity']] = {}

        let id = MappingHelper.getObjectId(entity)
        if(id) {
            this.entites[entity.constructor['entity']][id] = entity
        }

    }

    get(model: typeof Model, id: string) {
        if(!this.entites[model.entity]) return null;
        if(!this.entites[model.entity][id]) return null;

        return this.entites[model.entity][id]
    }
}

const database = new Database()

export default database