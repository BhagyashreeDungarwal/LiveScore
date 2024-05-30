using LiveScoring.Model;
using Microsoft.AspNetCore.SignalR;

namespace LiveScore.Services
{
    public class ScoreHub : Hub<IScoreHub>
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task UpdateScore(Score score)
        {
            string groupName = GetGroupNameForMatch(score);
            await Clients.Group(groupName).UpdateScore(score);
        }

        private string GetGroupNameForMatch(Score score)
        {
            // Implement your logic to determine the group name based on the match or score details.
            return $"Match_{score.AthleteRed}_{score.AthleteBlue}";
        }

    }
}
