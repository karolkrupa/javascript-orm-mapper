import Model from "../Model";

export default interface DatabaseInterface {
    persist(model: Model)

    getById(model: typeof Model, id: string | number): Model;

    get(ormUUID: string): Model;

    registerModel(model: typeof Model)

    getModel(entityName: string)
}