import {expect} from 'chai'
import Model from "../../src/Model";
import Id from "../../src/Database/Decorator/Id";
import ModelMapper from "../../src/Mapper/ModelMapper";
import Database from "../../src/Database/Database";
import String from "../../src/DataType/String";
import Integer from "../../src/DataType/Integer";
import Entity from "../../src/Database/Decorator/Entity";

const database = new Database();

@Entity({
    name: 'ExampleEntity',
    database: database
})
class ExampleEntity extends Model {
    @Id()
    @Integer()
    id: number

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
        expect(entity).to.have.property('id').and.equals(1)
    })

    it('should map data without all model fields and keep original model data', function () {
        let entity = new ExampleEntity();

        ModelMapper.map({
            id: 1
        }, entity);

        expect(entity).to.have.property('id').and.equals(1)
        expect(entity).to.have.property('name').and.equals('my_name')
    })

    it('should be able to map null to any field type', function () {
        let entity = new ExampleEntity();

        ModelMapper.map({
            id: 1,
            name: null
        }, entity);

        expect(entity).to.have.property('id').and.equals(1)
        expect(entity).to.have.property('name').and.equals(null)
    })

    it('should persist entity data in database with id', function () {
        let entity = ModelMapper.persist({
            id: 1,
            extra_field: 'test'
        }, ExampleEntity);

        expect(entity).to.not.have.property('extra_field')
        expect(entity).to.have.property('id').and.equals(1)
        expect(database.getById(ExampleEntity, 1)).eq(entity)
    })

    it('should persist entity in database', function () {
        let entity = new ExampleEntity()
        entity.id = 1
        entity.name = 'name'

        ModelMapper.persistEntity(entity);

        expect(entity).to.not.have.property('extra_field')
        expect(entity).to.have.property('id').and.equals(1)
        expect(database.getById(ExampleEntity, 1)).eq(entity)
        expect(entity.__orm_uid).not.equals(null)
    })

    it('when persisting entity exist in database should map data to existing entity', function () {
        let entity = ModelMapper.persist({
            id: 1,
            extra_field: 'test'
        }, ExampleEntity);

        expect(entity).to.not.have.property('extra_field')
        expect(entity).to.have.property('id').and.equals(1)
        expect(database.getById(ExampleEntity, 1)).eq(entity)

        let newEntity = ModelMapper.persist({
            id: 1,
            extra_field: 'test1'
        }, ExampleEntity);

        expect(newEntity).eq(entity)
    })
})


