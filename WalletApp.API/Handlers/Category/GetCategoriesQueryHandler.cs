﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WalletApp.API.Helpers;
using WalletApp.API.Models.Category;
using WalletApp.API.Models.enums;
using WalletApp.API.Models.queries.Categories;
using WalletApp.API.Services;

namespace WalletApp.API.Handlers.Category;

public class GetCategoriesQueryHandler : IRequestHandler<CategoriesQuery, List<DefaultCategoryDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public GetCategoriesQueryHandler(DataContext dataContext, IMapper mapper, IAuthService _authService)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        this._authService = _authService;
    }
    
    public Task<List<DefaultCategoryDto>> Handle(CategoriesQuery request, CancellationToken cancellationToken)
    {

        List<Entities.Category> categories = new List<Entities.Category>();

        if (request.Type == TransactionType.Person)
        {
            categories = _dataContext.Categories
                .Where(x => (x.User == _authService.User) && x.IsDeleted == false && x.GroupId == null)
                .ToList();
        }

        if (request.Type == TransactionType.Group)
        {
            categories = _dataContext.Categories
                .Where(x => x.GroupId == _authService.User.GroupId)
                .ToList();
        }
        
        

        var mCategories = _mapper.Map<List<DefaultCategoryDto>>(categories);

        return Task.FromResult(mCategories);
    }
}