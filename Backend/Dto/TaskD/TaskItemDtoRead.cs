using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Dto.TaskD
{
    public class TaskItemDtoRead
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public PriorityStatus Priority { get; set; } = PriorityStatus.Low;
        public int ListBId { get; set; }
        public string? ListB { get; set; }
        public int Position { get; set; }= 0;
    }
}
