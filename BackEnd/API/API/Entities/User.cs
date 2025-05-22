using API.Enums;

namespace API.Entities;
public class User
{
    public string Username { get; set; }
    public string Id { get; set; }
    public string Password { get; set; }
    public Roles Role { get; set; }
    
    
    public User(string id, string username, string password, Roles role)
    {
        Username = username;
        Password = password;
        Id = id;
        Role = role;
    }
}