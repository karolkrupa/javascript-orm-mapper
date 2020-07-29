import Model from "../Model";
import MappingHelper from "../Mapper/MappingHelper";

type ModelsMap = { [name: string]: typeof Model }

export default class ModelsRegister {
    private models: ModelsMap = {}

    public register(model: typeof Model) {
        this.models[MappingHelper.getEntityName(model)] = model
    }

    public get(name: string) {
        return this.models[name]
    }
}