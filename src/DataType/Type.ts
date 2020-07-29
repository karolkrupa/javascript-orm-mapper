import Model from "../Model";
import DatabaseInterface from "../Database/DatabaseInterface";
import MappingHelper from "../Mapper/MappingHelper";

export abstract class Type {
    protected model: typeof Model = null

    public normalize(data: any) {
        return data
    }

    setModel(model: typeof Model) {
        this.model = model
    }

    protected getDatabase(): DatabaseInterface {
        return MappingHelper.getDatabase(this.model)
    }
}
