using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Reposity.TaskRep
{
    public interface ITaskReposity
    {
        Task<bool> SaveChangesAsync();
        void TaskDeleteReposity(TaskItem reqeust);
        Task TaskReposityCreate(TaskItem reqeust);
        Task<IEnumerable<TaskItem>> TaskReposityGetAll(int listId);
        Task<TaskItem?> TaskReposityGetById(int id, int listId);
        void TaskUpdateReposity(TaskItem reqeust);
    }
}