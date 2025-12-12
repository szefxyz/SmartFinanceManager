namespace backend.Models;

using System.Text.Json.Serialization;

public class Transaction
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public decimal Amount { get; set; }
	public string Category { get; set; } = string.Empty;
	public DateTime Date { get; set; }
	public int UserId { get; set; }

	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

	[JsonIgnore]
	public User User { get; set; } = null!;
}