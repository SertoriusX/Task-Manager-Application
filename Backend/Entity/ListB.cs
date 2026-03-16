using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Full_Stack_Task_Manager.Entity
{
    public class ListB
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }=string.Empty;
        public int BoardId { get; set; }
        public Board? Board { get; set; }
        public ICollection<TaskItem>? TaskItems { get; set; }
        public int Position { get; set; }
    }
}
