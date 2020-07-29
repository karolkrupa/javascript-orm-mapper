import {expect} from 'chai'
import DatabaseDecorator from "../../../src/Database/Decorator/Database";
import Database from "../../../src/Database/Database";
import EntityName from "../../../src/Database/Decorator/EntityName";
import MappingHelper from "../../../src/Mapper/MappingHelper";
import Model from "../../../src/Model";


describe('Database decorator', function () {
    it('should register model in models registry and bind database to model', function () {
        const database = new Database()

        @DatabaseDecorator(database)
        @EntityName('simpleEntity')
        class SimpleEntity extends Model{

        }

        expect(database.getModel('simpleEntity')).equal(SimpleEntity)
        expect(MappingHelper.getDatabase(SimpleEntity)).equal(database)
    })
})


