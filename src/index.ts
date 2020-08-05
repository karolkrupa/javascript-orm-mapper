import Database from "./Database/Database";
import DatabaseInterface from "./Database/DatabaseInterface";
import ModelMapper from "./Mapper/ModelMapper";
import Model from "./Model";
import MappingHelper from "./Mapper/MappingHelper";

import EntityDecorator from './Database/Decorator/Entity'
import IdDecorator from './Database/Decorator/Id'

import types from './DataType'

const decorators = {
    Entity: EntityDecorator,
    Id: IdDecorator
}

export default {
    decorators,
    types,
    Database,
    ModelMapper,
    Model,
    MappingHelper
}

export {
    decorators,
    types,
    Database,
    DatabaseInterface,
    ModelMapper,
    Model,
    MappingHelper,
    EntityDecorator as Entity,
    IdDecorator as Id
}