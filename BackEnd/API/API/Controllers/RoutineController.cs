using API.Models;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(AuthenticationSchemes="Bearer")]
[ApiController]
[Route("api/[controller]")]
public class RoutineController : ControllerBase
{
    private readonly ILogger<RoutineController> _logger;
    private RoutineDao _routineDao = new RoutineDao();

    public RoutineController(ILogger<RoutineController> logger)
    {
        _logger = logger;
    }

    [HttpGet("GetAllRoutines", Name = "GetAllRoutines")]
    public IActionResult GetAllRoutines()
    {
        try
        {   
           List<Routine> routines = _routineDao.GetAllRoutines();
           return Ok(routines);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return StatusCode(500);
        }
    }
}