using System.ComponentModel.DataAnnotations;

namespace Full_Stack_Task_Manager.Entity
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; }= string.Empty;
        public string PasswordHash {  get; set; }=string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Board>? Boards { get; set; }
    }
}
