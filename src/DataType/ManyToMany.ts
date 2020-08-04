import MappingHelper from "../Mapper/MappingHelper";
import { OneToManyType } from "./OneToMany";

export class ManyToManyType extends OneToManyType {

}

export default (entityName: string): PropertyDecorator => {
    let type = new ManyToManyType(entityName)

    return MappingHelper.getTypeDecorator(type)
}