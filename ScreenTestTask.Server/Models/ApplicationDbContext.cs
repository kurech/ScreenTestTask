using Microsoft.EntityFrameworkCore;

namespace ScreenTestTask.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().HasData(
                new Task { Id = Guid.NewGuid(), Text = "Первая задача", Type = TaskType.Unfulfilled },
                new Task { Id = Guid.NewGuid(), Text = "Вторая задача", Type = TaskType.Unfulfilled }
            );
        }
    }
}
