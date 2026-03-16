using Full_Stack_Task_Manager.Dto.ListD;
using Full_Stack_Task_Manager.Dto.TaskD;
using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Service.ListSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/boards/{boardId}/[controller]")]
[ApiController]
[Authorize]
public class ListBController : ControllerBase
{
    private readonly ListService _service;

    public ListBController(ListService service)
    {
        _service = service;
    }

    // GET /api/boards/1/ListB
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ListDtoRead>>> GetAll(int boardId)
    {
        var lists = await _service.ListSerGetAll(boardId);
        var dto = lists.Select(l => new ListDtoRead
        {
            Id = l.Id,
            Title = l.Title,
            Position = l.Position,
            Board=l.Board?.Title,
            BoardId=l.BoardId,
            TaskItems = l.TaskItems?.Select(x=>new TaskItemDtoRead
            {
                Title=x.Title,
            }).ToList()
        });

        return Ok(dto);
    }

    // GET /api/boards/1/ListB/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ListDtoRead>> GetById(int boardId, int id)
    {
        var list = await _service.ListSerGetById(id, boardId);
        if (list == null) return NotFound();

        var dto = new ListDtoRead
        {
            Id = list.Id,
            Title = list.Title,
            Position = list.Position
        };
        return Ok(dto);
    }

    // POST /api/boards/1/ListB
    [HttpPost]
    public async Task<ActionResult> Create(int boardId, [FromBody] ListDtoCreate request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest("Title is required.");

        var newList = new ListB
        {
            Title = request.Title,
            BoardId = boardId,
            Position = request.Position
        };

        await _service.ListCreateSer(newList);

        return CreatedAtAction(nameof(GetById), new { boardId, id = newList.Id }, newList);
    }

    // PUT /api/boards/1/ListB/5
    [HttpPut("{id}")]
    public async Task<ActionResult<ListDtoRead>> Update(int boardId, int id, [FromBody] ListDtoUpdate request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest("Title is required.");

        var list = await _service.ListSerGetById(id, boardId);

        if (list == null)
            return NotFound();

        list.Title = request.Title;
        list.Position = request.Position;

        await _service.ListSerUpdate(list);

        return Ok(new ListDtoRead
        {
            Id = list.Id,
            Title = list.Title,
            Position = list.Position,
            BoardId = list.BoardId
        });
    }

    // DELETE /api/boards/1/ListB/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int boardId, int id)
    {
        var list = await _service.ListSerGetById(id, boardId);
        if (list == null) return NotFound();

        await _service.ListSerRemove(list);
        return NoContent();
    }
}