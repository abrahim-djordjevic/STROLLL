using API.Models;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(AuthenticationSchemes="Bearer")]
[ApiController]
[Route("api/[controller]")]
public class SessionController : ControllerBase
{
    private readonly ILogger<SessionController> _logger;
    private SessionDao _sessionDao = new SessionDao();
    
    public SessionController(ILogger<SessionController> logger)
    {
        _logger = logger;
    }

    [HttpGet("GetAllSessions", Name = "GetAllSessions")]
    public IActionResult GetAllSessions()
    {
        try
        {   
            List<Session> sessions = _sessionDao.GetAllSessions();
            return Ok(sessions);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }

    [HttpGet("GetSessionsByPatientId", Name = "GetSessionsByPatientId")]
    public IActionResult GetSessionsByPatientId(string patientId)
    {
        try
        {   
            List<Session> sessions = _sessionDao.GetSessionsByPatientId(patientId);
            return Ok(sessions);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
    
    [HttpGet("GetSessionsByRoutineId", Name = "GetSessionsByRoutineId")]
    public IActionResult GetSessionsByRoutineId(string routineId)
    {
        try
        {   
            List<Session> sessions = _sessionDao.GetSessionsByRoutineId(routineId);
            return Ok(sessions);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }

    [HttpPost("AddSession", Name = "AddSession")]
    public IActionResult AddSession([FromBody] Session session)
    {
        try
        {   
            _sessionDao.AddSession(session);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
}