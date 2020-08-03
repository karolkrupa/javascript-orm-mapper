import Database from "./Database/Database";
import ModelMapper from "./Mapper/ModelMapper";
import Model from "./Model";
import MappingHelper from "./Mapper/MappingHelper";

import DatabaseDecorator from "./Database/Decorator/Database"
import EntityNameDecorator from "./Database/Decorator/EntityName"

import types from './DataType'

const decorators = {
    EntityDatabase: DatabaseDecorator,
    EntityName: EntityNameDecorator
}

export default {
    decorators,
    types,
    Database,
    ModelMapper,
    Model,
    MappingHelper
}
