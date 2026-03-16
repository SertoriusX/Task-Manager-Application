using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Reposity.BoardRep
{
    public interface IBoardReposity
    {
        Task<IEnumerable<Board>> AllBoard(int userId);
        Task<Board?> BoardById(int id, int userId);
        Task CreateBoard(Board board);
        void RemoveBoard(Board board);
        Task<bool> SaveChangesAsync();
        void UpdateBoard(Board board);
    }
}