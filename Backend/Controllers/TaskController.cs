using Full_Stack_Task_Manager.Dto.TaskD;
using Full_Stack_Task_Manager.Entity;
using Full_Stack_Task_Manager.Service.TaskSer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/list/{listId}/[controller]")]
[ApiController]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly TaskService _service;

    public TaskController(TaskService service)
    {
        _service = service;
    }

    // GET api/list/1/task
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItemDtoRead>>> GetAll(int listId)
    {
        var tasks = await _service.TaskSerGetAll(listId);

        var dto = tasks.Select(t => new TaskItemDtoRead
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Priority = t.Priority,
            DueDate = t.DueDate,
            Position = t.Position,
            ListB=t.ListB?.Title
            
        });

        return Ok(dto);
    }

    // GET api/list/1/task/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItemDtoRead>> GetById(int listId, int id)
    {
        var task = await _service.TaskSerGetById(id, listId);

        if (task == null)
            return NotFound();

        var dto = new TaskItemDtoRead
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Priority = task.Priority,
            DueDate = task.DueDate,
            Position = task.Position
        };

        return Ok(dto);
    }

    // POST api/list/1/task
    [HttpPost]
    public async Task<ActionResult> Create(int listId, [FromBody] TaskDtoCreate request)
    {
        var newTask = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Position = request.Position,
            ListBId = listId
        };

        await _service.TaskSerPostCreate(newTask);

        return CreatedAtAction(nameof(GetById), new { listId, id = newTask.Id }, newTask);
    }

    // PUT api/list/1/task/5
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int listId, int id, [FromBody] TaskDtoUpdate request)
    {
        var task = await _service.TaskSerGetById(id, listId);

        if (task == null)
            return NotFound();

        task.Title = request.Title;
        task.Description = request.Description;
        task.Priority = request.Priority;
        task.DueDate = request.DueDate;
        task.Position = request.Position;

        await _service.TaskSerPut(task);

        return Ok(task);
    }

    // DELETE api/list/1/task/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int listId, int id)
    {
        var task = await _service.TaskSerGetById(id, listId);

        if (task == null)
            return NotFound();

        await _service.TaskSerDelete(task);

        return NoContent();
    }
}