using backend.Data;
using backend.Dtos;
using backend.Models;
using backend.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.Api
{
	[ApiController]
	[Route("api/[controller]")]
	public class TransactionController : ControllerBase
	{
		private readonly AppDbContext _db;

		public TransactionController(AppDbContext db)
		{
			_db = db;
		}

		[HttpPost("{userId}")]
		public async Task<IActionResult> Create(int userId, TransactionCreateDto dto)
		{
			var error = TransactionValidator.Validate(dto);
			if (error != null)
				return BadRequest(new { message = error });

			var transaction = new Transaction
			{
				Title = dto.Title,
				Amount = dto.Amount,
				Category = dto.Category,
				Date = dto.Date,
				UserId = userId
			};

			_db.Transactions.Add(transaction);
			await _db.SaveChangesAsync();

			return Ok(new { message = "Transaction added successfully." });
		}

		[HttpGet("{userId}")]
		public async Task<IActionResult> GetUserTransactions(int userId)
		{
			var list = await _db.Transactions
				.Where(t => t.UserId == userId)
				.OrderByDescending(t => t.CreatedAt)
				.ToListAsync();

			return Ok(list);
		}

		[HttpDelete("{userId}/{id}")]
		public async Task<IActionResult> Delete(int userId, int id)
		{
			var trx = await _db.Transactions
				.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

			if (trx == null)
				return NotFound(new { message = "Transaction not found or unauthorized." });

			_db.Transactions.Remove(trx);
			await _db.SaveChangesAsync();

			return Ok(new { message = "Transaction deleted successfully." });
		}
	}
}
