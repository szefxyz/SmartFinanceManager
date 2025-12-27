namespace backend.Dtos;

public class TransactionCreateDto : ITransactionDto
{
	public string Title { get; set; } = string.Empty;
	public decimal Amount { get; set; }
	public string Category { get; set; } = string.Empty;
	public DateTime Date { get; set; }
}
