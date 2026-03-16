using Full_Stack_Task_Manager.Dto.UserD;
using Full_Stack_Task_Manager.Entity;

namespace Full_Stack_Task_Manager.Service.AuthSer
{
    public interface IAuthService
    {
        Task<string?> Login(LoginDto request);
        Task<User> Register(RegisterDto request);
    }
}