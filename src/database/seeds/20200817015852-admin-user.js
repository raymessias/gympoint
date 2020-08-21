'use strict'

const bcrypt = require('bcryptjs')


module.exports = {
  up: async (queryInterface) => {

    await queryInterface.bulkInsert('users', [
      {
        name: 'Administrador',
        email: 'admin@gympoint.com',
        password_hash: bcrypt.hashSync('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    {}
    )
  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('users', null, {})

  }
}
