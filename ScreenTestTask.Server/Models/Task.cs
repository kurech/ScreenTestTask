namespace ScreenTestTask.Server.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        public required string Text { get; set; }
        public TaskType Type { get; set; } = TaskType.Unfulfilled; 
    }

    public enum TaskType
    {
        Unfulfilled,
        Done
    }
}
