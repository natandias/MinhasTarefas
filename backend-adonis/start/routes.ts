/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsersController.GetAll')
  Route.post('/', 'UsersController.Create')
  Route.post('/login', 'UsersController.Login')
  Route.put('/:id', 'UsersController.Update')
  Route.delete('/:id', 'UsersController.Delete')
}).prefix('/api/users')

Route.group(() => {
  Route.get('/', 'TasksController.GetAll')
  Route.post('/', 'TasksController.Create')
  Route.put('/:id', 'TasksController.Update')
  Route.patch('/:id/status', 'TasksController.UpdateStatus')
  Route.delete('/:id', 'TasksController.Delete')
})
  .prefix('/api/tasks')
  .middleware('Auth')
