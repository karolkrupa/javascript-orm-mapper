import {expect} from 'chai'
import Database from "../../../src/Database/Database";
import MappingHelper from "../../../src/Mapper/MappingHelper";
import Model from "../../../src/Model";
import Entity from "../../../src/Database/Decorator/Entity";


describe('Entity decorator', function () {
    it('should bind entity name to model', function () {
        const database = new Database()

        @Entity({
            name: 'simpleEntity',
            database: database
        })
        class SimpleEntity extends Model{

        }

        expect(MappingHelper.getEntityName(SimpleEntity)).equal('simpleEntity')
    })

    it('should register model in models registry', function () {
        const database = new Database()

        @Entity({
            name: 'simpleEntity',
            database: database
        })
        class SimpleEntity extends Model{

        }

        expect(database.getModel('simpleEntity')).equal(SimpleEntity)
    })

    it('should bind database to model', function () {
        const database = new Database()

        @Entity({
            name: 'simpleEntity',
            database: database
        })
        class SimpleEntity extends Model{

        }

        expect(MappingHelper.getDatabase(SimpleEntity)).equal(database)
    })
})


