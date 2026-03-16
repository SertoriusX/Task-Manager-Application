using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Reposity.BoardRep;

namespace Full_Stack_Task_Manager.Service.BoardSer
{
    public class BoardService
    {
        private readonly IBoardReposity _reposity;
        public BoardService(IBoardReposity reposity)
        {
            _reposity = reposity;
        }

        public async Task<IEnumerable<Board>> BoardSerAll(int userId) => await _reposity.AllBoard(userId);

        public async Task<Board?> BoardSerById(int id, int userId) => await _reposity.BoardById(id, userId);
        public async Task BoardSerCreated(Board board){
            await _reposity.CreateBoard(board);
            await _reposity.SaveChangesAsync();
        }
        public async Task BoardSerUpdate(Board board) { 
            _reposity.UpdateBoard(board);
            await _reposity.SaveChangesAsync();
        }
        public async Task BoardSerRemove(Board board) { 
            _reposity.RemoveBoard(board);
            await _reposity.SaveChangesAsync();
        }

    }
}
