namespace API.Entities;

public class Session
{
    public string Id { get; set; }
    public string PatientId { get; set; }
    public string RoutineId { get; set; }
    public string PatientName { get; set; }
    public string RoutineName { get; set; }
    public DateTime SessionStartTime { get; set; }
    public DateTime SessionEndTime { get; set; }
    public int UserRating { get; set; }

    public Session(string id, string patientId, string routineId, DateTime sessionStartTime, DateTime sessionEndTime,
        int userRating)
    {
        Id = id;
        PatientId = patientId;
        RoutineId = routineId;
        SessionStartTime = sessionStartTime;
        SessionEndTime = sessionEndTime;
        UserRating = userRating;
    }
}