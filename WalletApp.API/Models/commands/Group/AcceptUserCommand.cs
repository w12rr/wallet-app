﻿using MediatR;

namespace WalletApp.API.Models.commands.Group;

public class AcceptUserCommand : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public Guid NotificationId { get; set; }
}