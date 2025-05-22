using Newtonsoft.Json;
using API.Entities;
namespace API.Models;

public class UserDao
{
    private List<User> _users;
    
    public UserDao() 
    {
        _users = LoadJSON();
    }
    
    private List<User> LoadJSON()
    {
        List<User> users;
        using (StreamReader r = new StreamReader("MockData/Users.json"))
        {
            string json = r.ReadToEnd();
            users = JsonConvert.DeserializeObject<List<User>>(json) ?? new List<User>();
        }
        return users;
    }
    
    public List<UserWithoutPassword> GetAllUsers()
    {
        List<UserWithoutPassword> usersWithoutPasswords = new List<UserWithoutPassword>();
        foreach (User user in _users)
        {
               usersWithoutPasswords.Add(new UserWithoutPassword(user.Id, user.Username, user.Role));
        }
        return usersWithoutPasswords;
    }

    public Boolean ValidateUser(string username, string password)
    {
        foreach (User user in _users)
        {
            if(user.Username == username && user.Password == password) return true;
        }
        return false;
    }
}