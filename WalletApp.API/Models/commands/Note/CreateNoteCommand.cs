﻿using MediatR;

namespace WalletApp.API.Models.commands.Note;

public class CreateNoteCommand : IRequest<Unit>
{
    public string Title { get; set; }
    public string Text { get; set; }
    public string TextColor { get; set; }
    public string BackgroundColor { get; set; }
}