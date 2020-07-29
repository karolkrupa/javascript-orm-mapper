import {expect} from 'chai'
import EntityName from "../../../src/Database/Decorator/EntityName";
import MappingHelper from "../../../src/Mapper/MappingHelper";
import Model from "../../../src/Model";


describe('Entity name decorator', function () {
    it('should register entity name in model class', function () {
        @EntityName('simpleEntity')
        class SimpleEntity extends Model{

        }

        expect(MappingHelper.getEntityName(SimpleEntity)).equal('simpleEntity')
    })
})


