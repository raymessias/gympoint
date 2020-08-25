import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'

const routes = new Router()


routes.post('/login', SessionController.store)

routes.use(authMiddleware)
routes.get('/students', StudentController.index)
routes.post('/students', StudentController.store)
routes.put('/students/:id', StudentController.update)
routes.delete('/students/:id', StudentController.delete)

routes.get('/plans', PlanController.index)
routes.post('/plans', PlanController.store)
routes.put('/plans/:id', PlanController.update)
routes.delete('plans/:id', PlanController.delete)

export default routes
