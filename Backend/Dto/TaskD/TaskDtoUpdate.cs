using Full_Stack_Task_Manager.Entity;
using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.TaskD
{
    public class TaskDtoUpdate
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }

        public PriorityStatus Priority { get; set; } = PriorityStatus.Medium;
        public int Position { get; set; } = 0;

    }
}
