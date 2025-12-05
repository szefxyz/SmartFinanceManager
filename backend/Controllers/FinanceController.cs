using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FinanceController : ControllerBase
	{
		[HttpGet]
		public IActionResult GetStatus()
		{
			return Ok("FinanceController działa ✔️");
		}
	}
}
