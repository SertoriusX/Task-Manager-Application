using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Full_Stack_Task_Manager.Entity
{
    public class Board
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }= string.Empty;
        public int UserId { get; set; }
        public User? User { get; set; }
        public ICollection<ListB>? Lists { get; set; }
    }
}
