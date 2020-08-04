import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import {StringType} from "../../src/DataType/String";


class TestModel extends Model {
    testField: boolean = null
}

describe('String type', function () {
    it('should be able to map properly different values', function () {
        let type = new StringType()

        let entity = new TestModel()

        type.map(entity, 'testField', 11, MappingMode.CREATE)
        expect(entity.testField).equals('11')
        type.map(entity, 'testField', 11, MappingMode.INSERT)
        expect(entity.testField).equals('11')

        type.map(entity, 'testField', 'test', MappingMode.CREATE)
        expect(entity.testField).equals('test')
        type.map(entity, 'testField', 'test', MappingMode.INSERT)
        expect(entity.testField).equals('test')
    })
})


