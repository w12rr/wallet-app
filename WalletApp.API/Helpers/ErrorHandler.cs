﻿using System.Net;
using System.Text.Json;

namespace WalletApp.API.Helpers;

public class ErrorHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public ErrorHandler(RequestDelegate next, ILogger<ErrorHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            switch (error)
            {
                case AppException e:
                    response.StatusCode = (int) HttpStatusCode.BadRequest;
                    break;
                default:
                    _logger.LogError(error, error.Message);
                    response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;
            }

            var result = JsonSerializer.Serialize(new {message = error?.Message});
            await response.WriteAsync(result);

        }
    }
}