using API.Enums;
namespace API.Entities;

public class UserWithoutPassword
{
    public string Username { get; set; }
    public string Id { get; set; }
    public Roles Role { get; set; }
    
    public UserWithoutPassword(string id, string username, Roles role)
    {
        Username = username;
        Id = id;
        Role = role;
    }
}