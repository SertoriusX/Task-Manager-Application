using Full_Stack_Task_Manager.Dto.ListD;
using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Dto.BoardD
{
    public class BoardDtoRead
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;   
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public ICollection<ListDtoRead>? Lists { get; set; }
    }
}
