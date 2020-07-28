import Model from "./Model";
declare class Database {
    private models;
    private entites;
    register(model: typeof Model): void;
    getModel(entityName: string): typeof Model;
    getModels(): {
        [name: string]: typeof Model;
    };
    persist(entity: Model): void;
    get(model: typeof Model, id: string): Model;
}
declare const database: Database;
export default database;
