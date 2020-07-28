import Model from "../Model";
export default class ModelMapper {
    static map(data: {}, model: Model): void;
    static persist(data: {}, model: typeof Model): Model;
}
