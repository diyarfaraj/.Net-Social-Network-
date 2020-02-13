using System.Net;
using System;
namespace Application.Errors
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, object error = null)
        {
            Code = code;
            Errors = error;
        }

        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}