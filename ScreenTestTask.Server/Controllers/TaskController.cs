using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScreenTestTask.Server.Models;
using System.Text.Json;

namespace ScreenTestTask.Server.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public IActionResult GetTasks(bool? isDone = null)
        {
            IQueryable<Models.Task> query = _context.Tasks;

            if (isDone.HasValue)
                query = query.Where(t => t.Type == (isDone.Value ? TaskType.Done : TaskType.Unfulfilled));

            return Ok(query.ToList());
        }

        [HttpPatch]
        public async Task<IActionResult> PatchTask([FromBody] Models.Task inputTask)
        {
            Console.WriteLine($"Received: {JsonSerializer.Serialize(inputTask)}");

            if (inputTask.Id == Guid.Empty)
                return BadRequest("Id задачи некорректно!");

            var task = await _context.Tasks.FindAsync(inputTask.Id);
            if (task == null)
                return NotFound();

            if (inputTask.Text != null)
                task.Text = inputTask.Text;

            if (Enum.IsDefined(typeof(TaskType), inputTask.Type))
                task.Type = inputTask.Type;

            await _context.SaveChangesAsync();
            return Ok(task);
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(taskId);
                if (task == null)
                    return NotFound();

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ошибка при удалении: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] string taskText)
        {
            if (string.IsNullOrWhiteSpace(taskText))
                return BadRequest("Текст задачи обязателен");

            var task = new Models.Task()
            {
                Text = taskText
            };

            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return StatusCode(201, task);
        }
    }
}
