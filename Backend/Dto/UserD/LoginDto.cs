using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Dto.UserD
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
