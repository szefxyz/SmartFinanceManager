using backend.Models;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }

    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user)
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

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    internal class SymmetricSecurityKey
    {
        private byte[] bytes;

        public SymmetricSecurityKey(byte[] bytes)
        {
            this.bytes = bytes;
        }
    }

    internal class JwtSecurityTokenHandler
    {
        public JwtSecurityTokenHandler()
        {
        }

        internal string WriteToken(JwtSecurityToken token)
        {
            throw new NotImplementedException();
        }
    }

    internal class JwtSecurityToken
    {
        private string? issuer;
        private string? audience;
        private Claim[] claims;
        private DateTime expires;
        private SigningCredentials signingCredentials;

        public JwtSecurityToken(string? issuer, string? audience, Claim[] claims, DateTime expires, SigningCredentials signingCredentials)
        {
            this.issuer = issuer;
            this.audience = audience;
            this.claims = claims;
            this.expires = expires;
            this.signingCredentials = signingCredentials;
        }
    }

    internal class SigningCredentials
    {
        private SymmetricSecurityKey secretKey;
        private object hmacSha256;

        public SigningCredentials(SymmetricSecurityKey secretKey, object hmacSha256)
        {
            this.secretKey = secretKey;
            this.hmacSha256 = hmacSha256;
        }
    }
}
