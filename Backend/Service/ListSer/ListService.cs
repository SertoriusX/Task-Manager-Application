using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Reposity.ListRep;

namespace Full_Stack_Task_Manager.Service.ListSer
{
    public class ListService
    {
        private readonly IListReposity _reposity;
        public ListService(IListReposity reposity)
        {
            _reposity = reposity;
        }
        public async Task<IEnumerable<ListB>>ListSerGetAll(int boardId)=> await _reposity.GetListReposityAll(boardId);
        public async Task<ListB?> ListSerGetById(int id, int boardId)=> await _reposity.GetListReposityId(id, boardId);
        public async Task ListCreateSer(ListB request)
        {
            await _reposity.PostListReposity(request);
            await _reposity.SaveChangesAsync();
        }
        public async Task ListSerUpdate(ListB request) { 
            _reposity.UpdateListReposity(request);
            await _reposity.SaveChangesAsync();
        }


        public async Task ListSerRemove(ListB request)
        {
            _reposity.DeleteListReposity(request);
            await _reposity.SaveChangesAsync();
        }

    }
}
