import MappingHelper from "../Mapper/MappingHelper";
import { ManyToOne } from "./ManyToOne";

export class OneToOne extends ManyToOne {

}

export default (entityName: string): PropertyDecorator => {
    let type = new OneToOne(entityName)

    return MappingHelper.getTypeDecorator(type)
}