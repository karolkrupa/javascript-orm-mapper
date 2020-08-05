import {expect} from 'chai'
import MappingHelper from "../../../src/Mapper/MappingHelper";
import Model from "../../../src/Model";
import Id from "../../../src/Database/Decorator/Id";


describe('Id decorator', function () {
    it('should register model id in object mapping', function () {
        class SimpleEntity extends Model{
            @Id()
            idField: number = null
        }

        expect(MappingHelper.getObjectIdFieldName(SimpleEntity)).equal('idField')
    })
})


