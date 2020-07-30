import Model from "../Model";
import DatabaseInterface from "../Database/DatabaseInterface";
import MappingHelper from "../Mapper/MappingHelper";
import MappingMode from "../Mapper/MappingMode";

export abstract class Type {
    protected model: typeof Model = null

    abstract map(entity: Model, field: string, data: any, mappingMode: MappingMode);

    public normalize(data: any, mode: MappingMode = MappingMode.INSERT) {
        return data
    }

    setModel(model: typeof Model) {
        this.model = model
    }

    protected getDatabase(): DatabaseInterface {
        return MappingHelper.getDatabase(this.model)
    }
}
