using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Models;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private UserDao _userDao = new UserDao();
    private readonly IConfiguration _configuration;

    public UserController(ILogger<UserController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }
    
    [Authorize(AuthenticationSchemes="Bearer")]
    [HttpGet("GetAllUsers", Name = "GetAllUsers")]
    public IActionResult GetAllUsers()
    {
        try
        {
            List<UserWithoutPassword> users = _userDao.GetAllUsers();
            return Ok(users);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
    
    [HttpPost("Login", Name = "Login")]
    public IActionResult Login([FromBody] LoginDetails details)
    {
        try
        {
            if(details.Username == "" || details.Password == "") return BadRequest();
            if (!_userDao.ValidateUser(details.Username, details.Password)) return Unauthorized();
            var token = GenerateJwtToken();
            return Ok(new { token = token });
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
    
    
    private string GenerateJwtToken()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppIdentitySettings:Secret").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        string issuer = _configuration.GetSection("AppIdentitySettings:Issuer").Value;
        string audience = _configuration.GetSection("AppIdentitySettings:Audience").Value;

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: new List<Claim>(),
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}