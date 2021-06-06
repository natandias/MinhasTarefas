import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class Auth {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { user_id, token } = request.headers();

    console.log("user_id, token", { user_id, token });
    
    try {
      const user = await User.query().select("id").where({ id: user_id, token: token }).first();
  
      if (user !== undefined && user) await next();
      else {
        return response.unauthorized({
          error: "Usuário não autorizado!",
        });
      }
    } catch (err) {
      return response.unauthorized({
        error: "Usuário não autorizado!",
      });
    }
  }
}
