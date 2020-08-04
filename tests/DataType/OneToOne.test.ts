import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import Integer from "../../src/DataType/Integer";
import Database from "../../src/Database/Database";
import DatabaseDecorator from '../../src/Database/Decorator/Database'
import EntityName from '../../src/Database/Decorator/EntityName'
import String from "../../src/DataType/String";
import Id from "../../src/Database/Decorator/Id";
import ModelMapper from "../../src/Mapper/ModelMapper";
import {OneToOneType} from "../../src/DataType/OneToOne";

const db = new Database()

@DatabaseDecorator(db)
@EntityName('TestModel')
class TestModel extends Model {
    child: ChildModel = null
}

@DatabaseDecorator(db)
@EntityName('ChildModel')
class ChildModel extends Model {
    @Id()
    @Integer()
    id: string = ''

    @String()
    name: string = ''
}

describe('ManyToOne type', function () {
    it('should map object correctly', function () {
        let type = new OneToOneType('ChildModel')
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
        let type = new OneToOneType('ChildModel')
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
        let type = new OneToOneType('ChildModel')
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
        let type = new OneToOneType('ChildModel')
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
        let type = new OneToOneType('ChildModel')
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


