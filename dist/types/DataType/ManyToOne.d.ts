import { Type } from "./Type";
export declare class ManyToOne extends Type {
    private entityName;
    constructor(modelName: string);
    normalize(data: any): any;
}
declare const _default: (entityName: string) => PropertyDecorator;
export default _default;
