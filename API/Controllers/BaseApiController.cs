﻿using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            else if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }
            else return BadRequest(result.Error);
        }

    }
}
