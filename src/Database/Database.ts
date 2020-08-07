import Model from "../Model";
import generateUUID from "./UUIDGenerator";
import DatabaseInterface from "./DatabaseInterface";
import MappingHelper from "../Mapper/MappingHelper";
import ModelsRegister from "./ModelsRegister";

type EntitiesMap = {
    [uuid: string]: Model
}

type EntitiesByNameMap = {
    [uuid: string]: Model[]
}

type EntitiesKeysMap = {
    [entityName: string]: {
        // primaryKey: entityUUID
        [primaryKey: string]: string
    }
}


export default class Database implements DatabaseInterface {
    protected entitiesKeys: EntitiesKeysMap = {}

    protected entities: EntitiesMap = {}

    protected entitiesByName: EntitiesByNameMap = {}

    protected modelsRegistry: ModelsRegister = null

    constructor() {
        this.modelsRegistry = new ModelsRegister()
    }

    public persist(entity: Model) {
        if (!this.entityHasUUID(entity)) {
            this.assingEntityUUID(entity)
        }

        this.storeEntity(entity)
    }

    protected storeEntity(entity: Model) {
        let entityName = MappingHelper.getEntityName(entity)

        if (!this.entitiesKeys[entityName]) this.entitiesKeys[entityName] = {}

        this.entities[this.getEntityUUID(entity)] = entity
        if (!this.entitiesByName[entityName]) {
            this.entitiesByName[entityName] = [entity]
        } else if (this.entitiesByName[entityName].indexOf(entity) > -1) {
            this.entitiesByName[entityName].push(entity)
        }

        let id = MappingHelper.getObjectId(entity)
        if (id) {
            this.entitiesKeys[entityName][id] = this.getEntityUUID(entity)
        }
    }

    protected getEntityUUID(entity: Model) {
        return entity.__orm_uid
    }

    protected entityHasUUID(entity: Model) {
        return entity.__orm_uid !== null
    }

    protected assingEntityUUID(entity: Model) {
        entity.__orm_uid = this.generateUUID()
    }

    protected generateUUID() {
        return generateUUID()
    }

    get(ormUUID: string): Model {
        return this.entities[ormUUID];
    }

    getAll(model: typeof Model) {
        let entityName = MappingHelper.getEntityName(model)

        if (!this.entitiesByName[entityName]) {
            return []
        }

        return this.entitiesByName[entityName]
    }

    getById(model: typeof Model, id: string | number): Model {
        let entityName = MappingHelper.getEntityName(model)

        if (!this.entitiesKeys[entityName]) return null;

        let entityUUID = this.entitiesKeys[entityName][id];

        if (!entityUUID) return null

        return this.entities[entityUUID];
    }

    registerModel(model: typeof Model) {
        this.modelsRegistry.register(model)
    }

    getModel(entityName: string) {
        return this.modelsRegistry.get(entityName)
    }


}