namespace backend.Validators;

using backend.Dtos;

public static class TransactionValidator
{
	private static readonly string[] AllowedCategories =
	{
		"Food", "Shopping", "Education", "Transport", "Entertainment", "Income"
	};

	public static string? Validate(TransactionCreateDto dto)
	{
		if (string.IsNullOrWhiteSpace(dto.Title))
			return "Title is required.";

		if (dto.Title.Length < 2)
			return "Title must be at least 2 characters.";

		if (dto.Title.Length > 30)
			return "Title cannot exceed 30 characters.";

		if (dto.Amount == 0)
			return "Amount cannot be zero.";

		if (!AllowedCategories.Contains(dto.Category))
			return "Invalid category.";

		if (dto.Date > DateTime.Today)
			return "Date cannot be in the future.";

		return null;
	}
}