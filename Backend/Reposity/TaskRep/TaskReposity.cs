using Full_Stack_Task_Manager.Database;
using Full_Stack_Task_Manager.Entity;
using Microsoft.EntityFrameworkCore;

namespace Full_Stack_Task_Manager.Reposity.TaskRep
{
    public class TaskReposity : ITaskReposity
    {
        private readonly ApplicationDbContext _context;
        public TaskReposity(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TaskItem>> TaskReposityGetAll(int listId) => await _context.TaskItems.Where(t => t.ListBId == listId).Include(b=>b.ListB).ToListAsync();
        public async Task<TaskItem?> TaskReposityGetById(int id, int listId) => await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.ListBId == listId);

        public async Task TaskReposityCreate(TaskItem request)
        {
            var listExists = await _context.ListBs.AnyAsync(l => l.Id == request.ListBId);
            if (!listExists)
                throw new InvalidOperationException($"ListB with ID {request.ListBId} does not exist.");

            await _context.TaskItems.AddAsync(request);
        }
        public void TaskUpdateReposity(TaskItem reqeust) => _context.TaskItems.Update(reqeust);
        public void TaskDeleteReposity(TaskItem reqeust) => _context.TaskItems.Remove(reqeust);
        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;



    }
}
