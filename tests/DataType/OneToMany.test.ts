import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import Database from "../../src/Database/Database";
import String from "../../src/DataType/String";
import {OneToManyType} from "../../src/DataType/OneToMany";
import Entity from "../../src/Database/Decorator/Entity";
import {Id} from "../../src";
import Integer from "../../src/DataType/Integer";

const db = new Database()

@Entity({
    name: 'TestModel',
    database: db
})
class TestModel extends Model {
    children: ChildModel[] = []
}

@Entity({
    name: 'ChildModel',
    database: db
})
class ChildModel extends Model {
    @Id()
    @Integer()
    id: number = null

    @String()
    name: string = ''
}

describe('OneToMany type', function () {
    it('should map array correctly in create mode', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                name: 'test'
            },
            {
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')
    })

    it('should map array correctly in insert mode', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                name: 'test'
            },
            {
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')
    })

    it('should not duplicate entities', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                id: 1,
                name: 'test'
            },
            {
                id: 2,
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')
    })

    it('should overwrite data in create mode', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                name: 'test'
            },
            {
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')

        data = [
            {
                name: 'test2'
            },
            {
                name: 'test3'
            }
        ]

        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test2')
        expect(entity.children[1]).to.property('name').exist.and.equals('test3')

        data = null

        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(entity.children).length(0)
    })

    it('should not overwrite with empty collection in insert mode', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                name: 'test'
            },
            {
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')

        data = []

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')

        data = null

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')
    })

    it('should add new data to collection in insert mode', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = [
            {
                name: 'test'
            },
            {
                name: 'test1'
            }
        ]

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(2)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')

        data = [
            {
                name: 'test2'
            }
        ]

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(entity.children).length(3)
        expect(entity.children[0]).to.property('name').exist.and.equals('test')
        expect(entity.children[1]).to.property('name').exist.and.equals('test1')
        expect(entity.children[2]).to.property('name').exist.and.equals('test2')
    })

    it('should set empty collection if provided data is empty or invalid', function () {
        let type = new OneToManyType('ChildModel')
        type.setModel(TestModel)

        let entity = new TestModel()

        let data = null

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)
        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)

        data = []

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)
        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)

        data = 'test data'

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)
        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)

        data = {}

        type.map(entity, 'children', data, MappingMode.INSERT)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)
        type.map(entity, 'children', data, MappingMode.CREATE)
        expect(Array.isArray(entity.children)).equals(true)
        expect(entity.children).length(0)
    })
})


