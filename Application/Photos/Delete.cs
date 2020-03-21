using System.Linq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Errors;
using System.Net;

namespace Application.Photos
{
    public class Delete
    {
         public class Command : IRequest 
                {
                    public string Id { get; set; }
                }
        
                public class Handler : IRequestHandler<Command>
                {
                private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;
                    public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
                    {
                    _photoAccessor = photoAccessor;
                    _userAccessor = userAccessor;
                    _context = context;
                        
                    }
        
                    public async Task<Unit> Handle(Command request, 
                    CancellationToken cancellationToken)
                    {
                      //Handler logic here

                      var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.getCurrentUsername());

                      var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                      if(photo == null)
                        throw new RestException(HttpStatusCode.NotFound, new {Photo = "not found "}); 

                    if(photo.IsMain)
                        throw new RestException(HttpStatusCode.BadRequest, new {Photo = "you can not delete you main photo"});

                    
                    var result = _photoAccessor.DeletePhoto(photo.Id);

                    if(result == null)
                        throw new Exception("Problemas deleteing the photo"); 

                    user.Photos.Remove(photo);
        
                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem Saving chnages");
                    }
                }
    }
}