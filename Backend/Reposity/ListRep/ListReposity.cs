using Full_Stack_Task_Manager.Database;
using Full_Stack_Task_Manager.Entity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Full_Stack_Task_Manager.Reposity.ListRep
{
    public class ListReposity : IListReposity
    {
        private readonly ApplicationDbContext _context;
        public ListReposity(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ListB>> GetListReposityAll(int boardId) =>
            await _context.ListBs.Where(t => t.BoardId == boardId).Include(b=>b.Board).Include(b=> b.TaskItems).ToListAsync();
        public async Task<ListB?> GetListReposityId(int id, int boardId) =>
         await _context.ListBs.FirstOrDefaultAsync(t => t.Id == id && t.BoardId == boardId);
        public async Task PostListReposity(ListB request) => await _context.ListBs.AddAsync(request);

        public void UpdateListReposity(ListB request)
        {

            _context.ListBs.Update(request);
        }
        public void DeleteListReposity(ListB request)
        {

            _context.ListBs.Remove(request);
        }

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;


    }

}
