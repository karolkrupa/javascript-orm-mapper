import {expect} from 'chai'
import ObjectMapping from "../../src/Mapper/ObjectMapping";
import Model from "../../src/Model";
import Database from "../../src/Database/Database";
import MappingHelper from "../../src/Mapper/MappingHelper";
import {Type} from "../../src/DataType/Type";
import MappingMode from "../../src/Mapper/MappingMode";
import Id, {IdType} from "../../src/DataType/Id";


class Entity extends Model {
}


function getObjectWithMapping() {
    let objectMapping = new ObjectMapping()

    let entity = new Entity();
    entity.constructor['orm'] = objectMapping;

    return {
        mapping: entity.constructor['orm'],
        entity
    }
}

class TestType extends Type {
    map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        return null
    }
}


describe('Mapping helper', function () {
    it('getObjectMapping test', function () {
        let { mapping, entity } = getObjectWithMapping()

        expect(MappingHelper.getObjectMapping(entity)).equals(mapping)
    })

    it('setDatabase test', function () {
        let { mapping, entity } = getObjectWithMapping()

        const database = new Database()

        MappingHelper.setDatabase(entity, database)

        expect(mapping.getDatabase()).equal(database)
    })

    it('getDatabase test', function () {
        let { mapping, entity } = getObjectWithMapping()

        expect(MappingHelper.getDatabase(entity)).equal(null)

        const database = new Database()
        mapping.setDatabase(database)

        expect(MappingHelper.getDatabase(entity)).equal(database)
    })

    it('setEntityName test', function () {
        let { mapping, entity } = getObjectWithMapping()

        MappingHelper.setEntityName(entity, 'test')

        expect(mapping.getEntityName()).equal('test')
    })

    it('getEntityName test', function () {
        let { mapping, entity } = getObjectWithMapping()

        expect(MappingHelper.getEntityName(entity)).equal(null)

        mapping.setEntityName('test')

        expect(MappingHelper.getEntityName(entity)).equal('test')
    })

    it('addFieldMapping test', function () {
        let { mapping, entity } = getObjectWithMapping()

        let type = new TestType()
        MappingHelper.addFieldMapping(entity, 'test', type)

        expect(mapping.getFieldType('test')).equal(type)
    })

    it('getFieldMapping test', function () {
        let { mapping, entity } = getObjectWithMapping()

        expect(MappingHelper.getFieldMapping(entity, 'test')).equal(null)

        let type = new TestType()
        mapping.addField('test', type)

        expect(MappingHelper.getFieldMapping(entity, 'test')).equal(type)
    })

    it('getMappedFields test', function () {
        let { mapping, entity } = getObjectWithMapping()

        expect(Object.keys(MappingHelper.getMappedFields(entity))).length(0)

        let type = new TestType()
        mapping.addField('test', type)

        let mappedFields = MappingHelper.getMappedFields(entity);

        expect(Object.keys(mappedFields)).length(1)
        expect(mappedFields).has.property('test').and.equals(type)
    })

    it('getObjectIdFieldName test', function () {
        let { mapping, entity } = getObjectWithMapping()

        let idType = new IdType()
        mapping.addField('id', idType)

        entity['id'] = '11'

        expect(MappingHelper.getObjectId(entity)).equals('11')
    })

    it('getObjectId test', function () {
        let { mapping, entity } = getObjectWithMapping()

        let idType = new IdType()
        mapping.addField('id_name', idType)

        expect(MappingHelper.getObjectIdFieldName(entity)).equals('id_name')
    })
})


