using backend.Dtos;

namespace backend.Validators
{
	public static class TransactionValidator
	{
		public static string? Validate(ITransactionDto dto)
		{
			if (string.IsNullOrWhiteSpace(dto.Title))
				return "Title is required.";

			if (dto.Amount == 0)
				return "Amount must be different than zero.";

			if (string.IsNullOrWhiteSpace(dto.Category))
				return "Category is required.";

			if (dto.Date == default)
				return "Date is required.";

			return null;
		}
	}
}
