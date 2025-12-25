using backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
	public interface IJwtService
	{
		string GenerateToken(User user, bool rememberMe);
	}

	public class JwtService : IJwtService
	{
		private readonly IConfiguration _configuration;

		public JwtService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public string GenerateToken(User user, bool rememberMe)
		{
			var jwtSettings = _configuration.GetSection("JwtSettings");
			var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
			var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

			var claims = new[]
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Email, user.Email),
				new Claim("FirstName", user.FirstName),
				new Claim("LastName", user.LastName)
			};

			var expires = rememberMe
				? DateTime.UtcNow.AddDays(15)
				: DateTime.UtcNow.AddHours(2);

			var token = new JwtSecurityToken(
				issuer: jwtSettings["Issuer"],
				audience: jwtSettings["Audience"],
				claims: claims,
				expires: expires,
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
