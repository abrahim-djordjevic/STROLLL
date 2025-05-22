namespace API.Entities;

public class LoginDetails
{
    public string Username { get; set; }
    public string Password { get; set; }
    
    public LoginDetails(string username, string password)
    {
        Username = username;
        Password = password;
    }
}