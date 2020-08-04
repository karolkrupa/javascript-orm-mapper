import {expect} from 'chai'
import ObjectMapping from "../../src/Mapper/ObjectMapping";
import Type from "../../src/DataType/Type";
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import Database from "../../src/Database/Database";


class TestType extends Type {
    map(entity: Model, field: string, data: any, mappingMode: MappingMode) {
        return null;
    }
}

describe('Object mapping', function () {
    it('should save field', function () {
        let mapping = new ObjectMapping();
        let type = new TestType();

        mapping.addField('test', type);

        expect(mapping.getFieldType('test')).equals(type)
    })

    it('should be able to set id field', function () {
        let mapping = new ObjectMapping();

        mapping.setIdField('test');

        expect(mapping.getIdField()).equals('test')
    })

    it('should not be able to set second id field', function () {
        let mapping = new ObjectMapping();

        mapping.setIdField('my_id');

        expect(() => mapping.setIdField('my_new_id')).to.throw(Error)
    })

    it('should return all mapped fields', function () {
        let mapping = new ObjectMapping();
        let testType = new TestType();
        let testType2 = new TestType();
        let testType3 = new TestType();

        mapping.addField('test', testType);
        mapping.addField('test_2', testType2);
        mapping.addField('test_2', testType3);

       let allFields = mapping.getFields();

       expect(Object.keys(allFields)).to.length(2)
       expect(allFields).has.property('test').and.equals(testType)
       expect(allFields).has.property('test_2').and.equals(testType3).and.not.equals(testType2)
    })

    it('should map entity name', function () {
        let mapping = new ObjectMapping();

        mapping.setEntityName('name')

        expect(mapping.getEntityName()).equals('name')
    })

    it('should map database', function () {
        let mapping = new ObjectMapping();
        const database = new Database()

        mapping.setDatabase(database)

        expect(mapping.getDatabase()).equals(database)
    })
})


