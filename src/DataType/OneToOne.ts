import MappingHelper from "../Mapper/MappingHelper";
import { ManyToOneType } from "./ManyToOne";

export class OneToOneType extends ManyToOneType {

}

export default (entityName: string): PropertyDecorator => {
    let type = new OneToOneType(entityName)

    return MappingHelper.getTypeDecorator(type)
}