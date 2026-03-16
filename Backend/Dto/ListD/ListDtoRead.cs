using Full_Stack_Task_Manager.Dto.TaskD;
using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Dto.ListD
{
    public class ListDtoRead
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int BoardId { get; set; }
        public string? Board { get; set; }
        public ICollection<TaskItemDtoRead>? TaskItems { get; set; }
        public int Position { get; set; }
    }
}

