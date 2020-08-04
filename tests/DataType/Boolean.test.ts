import {expect} from 'chai'
import Model from "../../src/Model";
import {BooleanType} from "../../src/DataType/Boolean";
import MappingMode from "../../src/Mapper/MappingMode";


class TestModel extends Model {
    testField: boolean = null
}

describe('Boolean type', function () {
    it('should be able to map properly different values', function () {
        let type = new BooleanType()

        let entity = new TestModel()

        let falseValues = [
            'false',
            '0',
            '',
            false
        ]

        let trueValues = [
            'true',
            '1',
            'some string',
            true
        ]

        for(let val of falseValues) {
            type.map(entity, 'testField', val, MappingMode.CREATE)
            expect(entity.testField).equals(false)
            type.map(entity, 'testField', val, MappingMode.INSERT)
            expect(entity.testField).equals(false)
        }

        for(let val of trueValues) {
            type.map(entity, 'testField', val, MappingMode.CREATE)
            expect(entity.testField).equals(true)
            type.map(entity, 'testField', val, MappingMode.INSERT)
            expect(entity.testField).equals(true)
        }
    })
})


