import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task';

export default class TasksController {
  public async GetAll({ request, response }: HttpContextContract) {
    const { user_id } = request.headers();
    const { status } = request.qs();

    try {
      const tasks = await Task.query().where(builder => {
        builder.where("user_id", user_id);
        if (status) builder.where("status", status);
      })

      return response.ok(tasks);
    } catch (err) {
      return response.badRequest({
        success: false,
        error: err,
      });
    }
  }

  public async Create({ request, response }: HttpContextContract) {
    const { title, description, deadlineDate, deadlineTime } = request.body();
    const { user_id } = request.headers();

    try {
      const newTask = await Task.create({  
          userId: user_id,
          title,
          description,
          deadlineDate,
          deadlineTime,
          status: "created" 
      });

      if (!newTask.$isPersisted) throw { message: "Houve um erro na criação da tarefa" };

      return response.ok({ success: true});
    } catch (err) {
      let errorMessage = err.message;

      return response.badRequest({
        success: false,
        error: errorMessage,
      });
    }
  }

  public async Update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { title, description, deadlineDate, deadlineTime } = request.body();
    const { user_id } = request.headers();

    try {
      const task = await Task.findOrFail(id); 

      if(task.userId !== parseInt(user_id)) throw { message: "Você não tem permissão para modificar essa tarefa" };

      const updatedTask = await task.merge({ title, description, deadlineDate, deadlineTime }).save();
      
      if (!updatedTask.$isPersisted) throw { message: "Houve um erro na atualização da tarefa" };

      return response.ok({ success: true});
    } catch (err) {
      let errorMessage = err.message;

      if(err.message && err.message.includes("E_ROW_NOT_FOUND")) {
        errorMessage = "A tarefa não existe"
      }
      
      return response.badRequest({
        success: false,
        error: errorMessage,
      });
    }
  }

  public async Delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { user_id } = request.headers();
  
    try {
      const task = await Task.findOrFail(id); 

      if(task.userId !== parseInt(user_id)) throw { message: "Você não tem permissão para excluir essa tarefa" };

      await task.delete();

      if (!task.$isDeleted) throw { message: "Houve um erro ao deletar a tarefa" };

      return response.ok({ success: true});
    } catch (err) {
      let errorMessage = err.message;

      if(err.message && err.message.includes("E_ROW_NOT_FOUND")) {
        errorMessage = "A tarefa não existe"
      }
      
      return response.badRequest({
        success: false,
        error: errorMessage,
      });
    }
  }

  public async UpdateStatus({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { status } = request.body();
    const { user_id } = request.headers();

    try {
      const task = await Task.findOrFail(id);  

      if(task.userId !== parseInt(user_id)) throw { message: "Você não tem permissão para excluir essa tarefa" };

      const updatedTask = await task.merge({ status }).save()

      if (!updatedTask.$isPersisted) throw { message: "Houve um erro na atualização do status da tarefa" };

      return response.ok({ success: true});
    } catch (err) {
      let errorMessage = err.message;

      if(err.message && err.message.includes("E_ROW_NOT_FOUND")) {
        errorMessage = "A tarefa não existe"
      }
      
      return response.badRequest({
        success: false,
        error: errorMessage,
      });
    }
  }
}
