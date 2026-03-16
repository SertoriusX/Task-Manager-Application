using Full_Stack_Task_Manager.Dto.BoardD;
using Full_Stack_Task_Manager.Dto.ListD;
using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Service.BoardSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Full_Stack_Task_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardController : ControllerBase
    {
        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        private readonly BoardService _service;
        public BoardController(BoardService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<BoardDtoRead>> BoardAll()
        {
            var board = await _service.BoardSerAll(GetUserId());
            var dto = board.Select(x => new BoardDtoRead
            {
                Id = x.Id,
                Title = x.Title,
                Lists = x.Lists?.Select(l => new ListDtoRead
                {
                    Id = l.Id,
                    Title = l.Title
                    
                }).ToList()

            }); 
            return Ok(dto);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BoardDtoRead>> BoardId(int id)
        {
            var board = await _service.BoardSerById(id,GetUserId());
            if(board == null)
            {
                return NotFound();
            }
            var dto = new BoardDtoRead
            {   Id=board.Id,
                Title = board.Title
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> BoardCreate(BoardDtoCreate request)
        {
            var task = new Board
            {
                Title = request.Title,
                UserId= GetUserId(),
            };
            await _service.BoardSerCreated(task);
            return CreatedAtAction(nameof(BoardId), new { id = task.Id }, task);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> BoardUpdate(int id,BoardDtoUpdate request)
        {
            var board = await _service.BoardSerById(id, GetUserId());
            if (board == null)
            {
                return NotFound();
            }
            board.Title = request.Title;
            await _service.BoardSerUpdate(board);
            return NoContent();

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> BoardDelete(int id)
        {
            var board = await _service.BoardSerById(id, GetUserId());
            if (board == null)
            {
                return NotFound();
            }
            await _service.BoardSerRemove(board);
            return NoContent();

        }


    }
}

