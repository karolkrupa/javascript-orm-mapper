import MappingHelper from "../Mapper/MappingHelper";
import { OneToMany } from "./OneToMany";

export class ManyToMany extends OneToMany {

}

export default (entityName: string): PropertyDecorator => {
    let type = new ManyToMany(entityName)

    return MappingHelper.getTypeDecorator(type)
}