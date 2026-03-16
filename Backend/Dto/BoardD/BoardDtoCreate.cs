using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.BoardD
{
    public class BoardDtoCreate
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}
