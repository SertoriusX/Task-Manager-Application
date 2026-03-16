using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Reposity.TaskRep;

namespace Full_Stack_Task_Manager.Service.TaskSer
{
    public class TaskService
    {
        private readonly ITaskReposity _reposity;
        public TaskService(ITaskReposity reposity)
        {
            _reposity = reposity;
        }

        public async Task<IEnumerable<TaskItem>>TaskSerGetAll(int listId)=> await _reposity.TaskReposityGetAll(listId);
        public async Task<TaskItem?> TaskSerGetById(int id, int listId) => await _reposity.TaskReposityGetById(id, listId);
        public async Task TaskSerPostCreate(TaskItem taskItem)
        {
            try
            {
                await _reposity.TaskReposityCreate(taskItem);
                await _reposity.SaveChangesAsync();
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }
        public async Task TaskSerPut(TaskItem taskItem) { 
            _reposity.TaskUpdateReposity(taskItem);
            await _reposity.SaveChangesAsync();
        }

        public async Task TaskSerDelete(TaskItem taskItem)
        {
            _reposity.TaskDeleteReposity(taskItem);
            await _reposity.SaveChangesAsync();
        }
    }
}
