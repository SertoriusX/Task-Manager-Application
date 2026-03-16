using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.ListD
{
    public class ListDtoUpdate
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public int Position { get; set; }

    }
}
