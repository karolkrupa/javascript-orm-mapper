import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import {FloatType} from "../../src/DataType/Float";


class TestModel extends Model {
    testField: boolean = null
}

describe('Boolean type', function () {
    it('should be able to map properly different values', function () {
        let type = new FloatType()

        let entity = new TestModel()

        type.map(entity, 'testField', 0.13, MappingMode.CREATE)
        expect(entity.testField).equals(0.13)
        type.map(entity, 'testField', 0.13, MappingMode.INSERT)
        expect(entity.testField).equals(0.13)

        type.map(entity, 'testField', '0.13', MappingMode.CREATE)
        expect(entity.testField).equals(0.13)
        type.map(entity, 'testField', '0.13', MappingMode.INSERT)
        expect(entity.testField).equals(0.13)

        type.map(entity, 'testField', '-0.13', MappingMode.CREATE)
        expect(entity.testField).equals(-0.13)
        type.map(entity, 'testField', '-0.13', MappingMode.INSERT)
        expect(entity.testField).equals(-0.13)
    })
})


