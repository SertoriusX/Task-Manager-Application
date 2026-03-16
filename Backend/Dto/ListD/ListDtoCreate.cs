using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.ListD
{
    public class ListDtoCreate
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public int BoardId { get; set; }
        [Required]
        public int Position { get; set; }
    }
}
