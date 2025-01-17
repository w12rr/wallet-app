﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using WalletApp.API.Helpers;
using WalletApp.API.Models.Category;
using WalletApp.API.Models.enums;
using WalletApp.API.Models.queries.Transaction;
using WalletApp.API.Services;

namespace WalletApp.API.Handlers.Transaction;

public class GetToIncomeChartQueryHandler : IRequestHandler<GetToIncomeChartQuery, List<ToChartModelDto>>
{
    private readonly DataContext _dataContext;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public GetToIncomeChartQueryHandler(DataContext dataContext, IAuthService authService, IMapper mapper)
    {
        _dataContext = dataContext;
        _authService = authService;
        _mapper = mapper;
    }
    
    public Task<List<ToChartModelDto>> Handle(GetToIncomeChartQuery request, CancellationToken cancellationToken)
    {
        IIncludableQueryable<Entities.Transaction, Entities.Category> transactions;
        
        if (request.Type == TransactionType.Person)
        {
            transactions = _dataContext.Transactions
                .Where(x => _authService.User.Id == x.UserId && x.Price > 0)
                .Include(x => x.Category);
        }
        else
        {
            transactions = _dataContext.Transactions
                .Where(x => _authService.User.GroupId == x.GroupId && x.Price > 0)
                .Include(x => x.Category);
        }
        
        

        var groupedTransactions = transactions
            .GroupBy(x => x.CategoryId)
            .Select(x => new ToChartModelDto {Name = x.Select(y => y.Category.Name).First(), Value = x.Sum(y =>  y.Price) })
            .ToList();


        return Task.FromResult(!transactions.Any() ? new List<ToChartModelDto>() : groupedTransactions);
    }
}