using API.Entities;
using Newtonsoft.Json;

namespace API.Models;

public class RoutineDao
{
    private List<Routine> _routines = new List<Routine>();

    public RoutineDao()
    {
        _routines = LoadJSON();
    }

    private List<Routine> LoadJSON()
    {
        List<Routine> routines;
        using (StreamReader r = new StreamReader("MockData/Routines.json"))
        {
            string json = r.ReadToEnd();
            routines = JsonConvert.DeserializeObject<List<Routine>>(json) ?? new List<Routine>();
        }
        return routines;
    }

    public List<Routine> GetAllRoutines()
    {
        return _routines;
    }
}