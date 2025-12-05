var builder = WebApplication.CreateBuilder(args);

// Add services for MVC Controllers
builder.Services.AddControllers();

// Enable CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p =>
        p.AllowAnyOrigin()
         .AllowAnyMethod()
         .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

// Map MVC controllers
app.MapControllers();

app.MapGet("/", () => "SmartFinanceManager API (MVC) działa ✔️");

app.Run();
