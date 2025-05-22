using Newtonsoft.Json;
using API.Entities;
namespace API.Models;

public class SessionDao
{
    private List<Session> _sessions;

    public SessionDao()
    {
       _sessions = LoadJSON();
    }

    private List<Session> LoadJSON()
    {
        List<Session> sessions;
        using (StreamReader r = new StreamReader("MockData/Sessions.json"))
        {
            string json = r.ReadToEnd();
            sessions = JsonConvert.DeserializeObject<List<Session>>(json) ?? new List<Session>();
        }
        return sessions;
    }

    public List<Session> GetAllSessions()
    {
        return _sessions;
    }

    public List<Session> GetSessionsByPatientId(string patientId)
    {
        return _sessions.Where(s => s.PatientId == patientId).ToList();
    }

    public List<Session> GetSessionsByRoutineId(string routineId)
    {
        return _sessions.Where(s => s.RoutineId == routineId).ToList();
    }

    public void AddSession(Session session)
    {
        _sessions.Add(session);
        using (StreamWriter w = new StreamWriter("MockData/Sessions.json"))
        {
            string json = JsonConvert.SerializeObject(_sessions);
            w.Write(json);
        }
    }
}