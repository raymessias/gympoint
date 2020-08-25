import { Sequelize } from 'sequelize'

import Configdb from '../config/Configdb'

import User from '../app/models/User'
import Student from '../app/models/Student'
import Plan from '../app/models/Plan'

const models = [User, Student, Plan]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(Configdb)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))

  }


}

export default new Database()
