using System.ComponentModel.DataAnnotations.Schema;

namespace Full_Stack_Task_Manager.Entity
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; }= string.Empty;
        public DateTime DueDate { get; set; }
        public PriorityStatus Priority {  get; set; } = PriorityStatus.Low;
        public int ListBId { get; set; }
        public ListB? ListB { get; set; }
        public int Position { get; set; } = 0;

    }
}
