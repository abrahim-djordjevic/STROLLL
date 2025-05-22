namespace API.Entities;

public class Routine
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Difficulty { get; set; }

    public Routine(string id, string name, string description, int difficulty)
    {
        Id = id;
        Name = name;
        Description = description;
        Difficulty = difficulty;
    }
}