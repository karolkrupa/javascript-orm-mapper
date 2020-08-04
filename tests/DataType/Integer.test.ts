import {expect} from 'chai'
import Model from "../../src/Model";
import MappingMode from "../../src/Mapper/MappingMode";
import {IntegerType} from "../../src/DataType/Integer";


class TestModel extends Model {
    testField: boolean = null
}

describe('Boolean type', function () {
    it('should be able to map properly different values', function () {
        let type = new IntegerType()

        let entity = new TestModel()

        let valuesMap = [
            {
                val: 0.13,
                expected: 0
            },
            {
                val: 0.9,
                expected: 0
            },
            {
                val: 1,
                expected: 1
            },
            {
                val: '1',
                expected: 1
            },
            {
                val: '1.11',
                expected: 1
            },
            {
                val: '',
                expected: null
            },
            {
                val: null,
                expected: null
            }
        ]

        for(let data of valuesMap) {
            type.map(entity, 'testField', data.val, MappingMode.CREATE)
            expect(entity.testField).equals(data.expected)
            type.map(entity, 'testField', data.val, MappingMode.INSERT)
            expect(entity.testField).equals(data.expected)
        }
    })
})


