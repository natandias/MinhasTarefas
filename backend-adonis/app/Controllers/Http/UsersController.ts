import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import bcrypt from 'bcrypt';

const saltRounds = 10

export default class UsersController {
  public async GetAll({ response }: HttpContextContract) {
    return response.ok({
      controller: 'Users',
      method: 'GetAll',
      methodImplemented: false,
    })
  }

  public async Create({ request, response }: HttpContextContract) {
    try {
      const { username, password } = request.body()

      const encryptedPassword = await bcrypt.hash(password, saltRounds)

      const tokenUnencripted = [
        username,
        String(Date.now()),
        String(Math.floor(Math.random() * 5733)),
      ].join('')

      const encryptedToken = await bcrypt.hash(tokenUnencripted, saltRounds)

      const userExist = await User.findBy("username", username);

      if (userExist) throw 'Esse usuário não está disponível!'

      const createdUser = await User.create({
        username,
        password: encryptedPassword,
        token: encryptedToken,
      })

      return response.created({
        userId: createdUser.id,
        token: createdUser.token,
      })
    } catch (err) {
      return response.badRequest({
        error:
          'Falha na criação de usuário, tente novamente mais tarde ou consulte um administrador!',
      })
    }
  }

  public async Login({ request, response }: HttpContextContract) {
    try {
      const { username, password } = request.body()

      const user = await User.findBy('username', username);

      if (!user) throw "Usuário ou senha incorretos !";

      const doesPasswordMatch = await bcrypt.compare(password, user.password);

      if (!doesPasswordMatch) throw "Usuário ou senha incorretos !";

      const tokenUnencripted = [
        user.username,
        String(Date.now()),
        String(Math.floor(Math.random() * 5733)),
      ].join("");

      const encryptedToken = await bcrypt.hash(tokenUnencripted, saltRounds);

      await user
      .merge({ token: encryptedToken })
      .save()

      const userUpdated = await User.findBy('username', username); 

      return response.ok({
        userId: userUpdated?.id,
        token: userUpdated?.token,
      })
    } catch (err) {
      return response.badRequest({
        error: err,
      });
    }
  }

  public async Update({ response }: HttpContextContract) {
    return response.ok({
      controller: 'Users',
      method: 'Update',
      methodImplemented: false,
    })
  }

  public async Delete({ response }: HttpContextContract) {
    return response.ok({
      controller: 'Users',
      method: 'Delete',
      methodImplemented: false,
    })
  }
}
