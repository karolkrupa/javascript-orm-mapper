import { Type } from "./Type";
export declare class OneToMany extends Type {
    private entityName;
    constructor(entityName: string);
    normalize(data: any): any;
}
declare const _default: (entityName: string) => PropertyDecorator;
export default _default;
