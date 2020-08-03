import {expect} from 'chai'
import Model from "../../src/Model";
import Id from "../../src/DataType/Id";
import ModelMapper from "../../src/Mapper/ModelMapper";
import Database from "../../src/Database/Database";
import DatabaseAnnotation from "../../src/Database/Decorator/Database";
import EntityName from "../../src/Database/Decorator/EntityName";
import String from "../../src/DataType/String";

const database = new Database();

@DatabaseAnnotation(database)
@EntityName('ExampleEntity')
class ExampleEntity extends Model {
    @Id()
    id: string

    @String()
    name: string = 'my_name'
}

describe('Model mapper', function () {
    it('should not map extra fields', function () {
        let entity = new ExampleEntity();

        ModelMapper.map({
            id: 1,
            name: 'test_name',
            extra_field: 'test'
        }, entity);

        expect(entity).to.not.have.property('extra_field')
        expect(entity).to.have.property('id').and.equals('1')
    })

    it('should map data without all model fields and keep original model data', function () {
        let entity = new ExampleEntity();

        ModelMapper.map({
            id: 1
        }, entity);

        expect(entity).to.have.property('id').and.equals('1')
        expect(entity).to.have.property('name').and.equals('my_name')
    })

    it('should be able to map null to any field type', function () {
        let entity = new ExampleEntity();

        ModelMapper.map({
            id: 1,
            name: null
        }, entity);

        expect(entity).to.have.property('id').and.equals('1')
        expect(entity).to.have.property('name').and.equals(null)
    })

    it('should persist entity in database with id', function () {
        let entity = ModelMapper.persist({
            id: 1,
            extra_field: 'test'
        }, ExampleEntity);

        expect(entity).to.not.have.property('extra_field')
        expect(entity).to.have.property('id').and.equals('1')
        expect(database.getById(ExampleEntity, 1)).eq(entity)
    })
})


