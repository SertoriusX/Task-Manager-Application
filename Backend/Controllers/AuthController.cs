using Full_Stack_Task_Manager.Dto.UserD;
using Full_Stack_Task_Manager.Service.AuthSer;
using Microsoft.AspNetCore.Mvc;

namespace Full_Stack_Task_Manager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var user = await _authService.Register(dto);

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.Login(dto);

            if (token == null)
                return Unauthorized("Invalid credentials");

            return Ok(new { token });
        }
    }
}