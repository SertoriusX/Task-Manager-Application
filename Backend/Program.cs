using Full_Stack_Task_Manager.Database;
using Full_Stack_Task_Manager.Reposity.BoardRep;
using Full_Stack_Task_Manager.Reposity.ListRep;
using Full_Stack_Task_Manager.Reposity.TaskRep;
using Full_Stack_Task_Manager.Service.AuthSer;
using Full_Stack_Task_Manager.Service.BoardSer;
using Full_Stack_Task_Manager.Service.ListSer;
using Full_Stack_Task_Manager.Service.TaskSer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.Text;
using System.Text.Json.Serialization;

namespace Full_Stack_Task_Manager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // -------------------------
            // Controllers
            // -------------------------
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters
                        .Add(new JsonStringEnumConverter());
                });

            // -------------------------
            // Database
            // -------------------------
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

            // -------------------------
            // Repositories
            // -------------------------
            builder.Services.AddScoped<IListReposity, ListReposity>();
            builder.Services.AddScoped<ITaskReposity, TaskReposity>();
            builder.Services.AddScoped<IBoardReposity, BoardReposity>();

            // -------------------------
            // Services
            // -------------------------
            builder.Services.AddScoped<ListService>();
            builder.Services.AddScoped<TaskService>();
            builder.Services.AddScoped<BoardService>();
            builder.Services.AddScoped<IAuthService, AuthService>();

            // -------------------------
            // JWT Authentication
            // -------------------------
            var jwtSettings = builder.Configuration.GetSection("Jwt");

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],

                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtSettings["Key"]!)
                        )
                    };
                });

            // -------------------------
            // CORS (React)
            // -------------------------
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                    policy.WithOrigins(
                        "http://localhost:4200",
                        "https://taskmanager-app.azurewebsites.net"
                    )
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            // -------------------------
            // Swagger
            // -------------------------
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // -------------------------
            // Middleware pipeline
            // -------------------------

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowFrontend");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}