import {expect} from 'chai'
import ObjectMapping from "../../src/Mapper/ObjectMapping";
import Model from "../../src/Model";
import Database from "../../src/Database/Database";
import MappingHelper from "../../src/Mapper/MappingHelper";
import {Type} from "../../src/DataType/Type";


class Entity extends Model {}


function getObjectWithMapping() {
    let objectMapping = new ObjectMapping()

    let entity = new Entity();
    entity.constructor['orm'] = objectMapping;

    return {
        mapping: objectMapping,
        entity
    }
}

class TestType extends Type {}


describe('Mapping helper', function () {
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
})


