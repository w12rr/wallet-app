﻿using MediatR;
using WalletApp.API.Helpers;
using WalletApp.API.Models.commands.Category;
using WalletApp.API.Models.enums;
using WalletApp.API.Services;

namespace WalletApp.API.Handlers.Category;

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Unit>
{
    private readonly DataContext _dataContext;
    private readonly IAuthService _authService;

    public CreateCategoryCommandHandler(DataContext _dataContext, IAuthService authService)
    {
        this._dataContext = _dataContext;
        _authService = authService;
    }
    
    public Task<Unit> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        if (request.Name.Trim() == "") return Task.FromResult(Unit.Value);
        var category = new Entities.Category()
        {
            User = _authService.User,
            Name = request.Name,
            IsDeleted = false
        };

        if (request.Type == TransactionType.Group)
        {
            category.GroupId = _authService.User.GroupId;
        }
    
        _dataContext.Categories.Add(category);
        _dataContext.SaveChanges();



        return Task.FromResult(Unit.Value);
    }
}