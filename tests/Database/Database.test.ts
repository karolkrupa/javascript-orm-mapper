import {expect} from 'chai'
import {Database, Entity, MappingHelper, Model, ModelMapper} from "../../src";
import String from "../../src/DataType/String";



describe('Database', function () {
    it('Should return all entities of type', function () {
        const database = new Database()

        @Entity({
            name: 'simpleEntity',
            database: database
        })
        class SimpleEntity extends Model{
            @String()
            name: string = ''
        }

        let entity = ModelMapper.persist({
            name: 'test'
        }, SimpleEntity)


        expect(database.getAll(SimpleEntity)).length(1).contains(entity)
    })
})


