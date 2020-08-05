import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import Integer from "../../src/DataType/Integer";
import Database from "../../src/Database/Database";
import String from "../../src/DataType/String";
import {ManyToOneType} from "../../src/DataType/ManyToOne";
import Id from "../../src/Database/Decorator/Id";
import ModelMapper from "../../src/Mapper/ModelMapper";
import Entity from "../../src/Database/Decorator/Entity";

const db = new Database()

@Entity({
    name: 'TestModel',
    database: db
})
class TestModel extends Model {
    child: ChildModel = null
}

@Entity({
    name: 'ChildModel',
    database: db
})
class ChildModel extends Model {
    @Id()
    @Integer()
    id: string = ''

    @String()
    name: string = ''
}

describe('ManyToOne type', function () {
    it('should map object correctly', function () {
        let type = new ManyToOneType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = {
            name: 'test'
        }

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).to.property('name').exist.and.equals('test')

        let entity1 = new TestModel()
        type.map(entity1, 'child', data, MappingMode.INSERT)
        expect(entity1.child).to.property('name').exist.and.equals('test')
    })

    it('should overwrite object in create mode', function () {
        let type = new ManyToOneType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = {
            name: 'test'
        }

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).to.property('name').exist.and.equals('test')

        data = {
            name: 'test1'
        }

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).to.property('name').exist.and.equals('test1')
    })

    it('should not overwrite object in insert mode', function () {
        let type = new ManyToOneType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = {
            name: 'test'
        }

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).to.property('name').exist.and.equals('test')

        data = {
            name: 'test1'
        }

        type.map(entity, 'child', data, MappingMode.INSERT)
        expect(entity.child).to.property('name').exist.and.equals('test')
    })


    it('should set null when data is invalid', function () {
        let type = new ManyToOneType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = ''

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).equals(null)

        data = null

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).equals(null)
    })


    it('should map to existing models in database', function () {
        let type = new ManyToOneType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = {
            id: 1
        }

        let entityInDb = ModelMapper.persist(data, ChildModel)

        type.map(entity, 'child', data, MappingMode.CREATE)
        expect(entity.child).equals(entityInDb)
    })
})


