import {expect} from 'chai'
import ObjectMapping from "../../src/Mapper/ObjectMapping";
import {Type} from "../../src/DataType/Type";
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import Id, {IdType} from "../../src/DataType/Id";
import IdTypeAlreadyDeclaredError from "../../src/Mapper/Exception/IdTypeAlreadyDeclaredError";
import String from "../../src/DataType/String";
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

    it('should map id field as model id', function () {
        let mapping = new ObjectMapping();
        let type = new TestType();
        let idType = new IdType();

        mapping.addField('test', type);
        mapping.addField('my_id', idType);

        expect(mapping.getFieldType('test')).equals(type)
        expect(mapping.getFieldType('my_id')).equals(idType)
        expect(mapping.getIdField()).equals('my_id')
    })

    it('should not be able to map second id field', function () {
        let mapping = new ObjectMapping();
        let idType = new IdType();

        mapping.addField('my_id', idType);

        let newIdType = new IdType();
        expect(() => mapping.addField('my_new_id', newIdType)).to.throw(Error)
    })

    it('should return all mapped fields', function () {
        let mapping = new ObjectMapping();
        let idType = new IdType();
        let testType = new TestType();
        let testType2 = new TestType();
        let testType3 = new TestType();

        mapping.addField('my_id', idType);
        mapping.addField('test', testType);
        mapping.addField('test_2', testType2);
        mapping.addField('test_2', testType3);

       let allFields = mapping.getFields();

       expect(Object.keys(allFields)).to.length(3)
       expect(allFields).has.property('my_id').and.equals(idType)
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


