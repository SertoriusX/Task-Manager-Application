using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Reposity.ListRep
{
    public interface IListReposity
    {
        void DeleteListReposity(ListB request);
        Task<IEnumerable<ListB>> GetListReposityAll(int boardId);
        Task<ListB?> GetListReposityId(int id, int boardId);
        Task PostListReposity(ListB request);
        Task<bool> SaveChangesAsync();
        void UpdateListReposity(ListB request);
    }
}