using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.BoardD
{
    public class BoardDtoUpdate
    {
        [Required]
        public string Title { get; set; } = string.Empty;
    }
}
