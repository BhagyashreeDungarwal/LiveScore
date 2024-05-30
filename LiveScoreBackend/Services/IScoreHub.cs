using LiveScoring.Model;

namespace LiveScore.Services
{
    public interface IScoreHub
    {
        Task JoinGroup(string groupName);
        Task LeaveGroup(string groupName);
        Task UpdateScore(Score score);
    }
}
