using Full_Stack_Task_Manager.Database;
using Full_Stack_Task_Manager.Entity;
using Microsoft.EntityFrameworkCore;

namespace Full_Stack_Task_Manager.Reposity.BoardRep
{
    public class BoardReposity : IBoardReposity
    {
        private readonly ApplicationDbContext _context;
        public BoardReposity(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Board>> AllBoard(int userId) => await _context.Boards.Where(t => t.UserId == userId).Include(b => b.Lists).ToListAsync();
        public async Task<Board?> BoardById(int id, int userId) => await _context.Boards.FirstOrDefaultAsync(t => t.UserId == userId && t.Id == id);

        public async Task CreateBoard(Board board) => await _context.Boards.AddAsync(board);

        public void UpdateBoard(Board board) => _context.Boards.Update(board);
        public void RemoveBoard(Board board) => _context.Boards.Remove(board);

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}
