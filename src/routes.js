import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import StudentController from './app/controllers/StudentController'
import SessionController from './app/controllers/SessionController'

const routes = new Router()


routes.post('/login', SessionController.store)
routes.use(authMiddleware)
routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)


export default routes
