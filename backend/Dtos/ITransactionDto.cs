namespace backend.Dtos
{
	public interface ITransactionDto
	{
		string Title { get; }
		decimal Amount { get; }
		string Category { get; }
		DateTime Date { get; }
	}
}
