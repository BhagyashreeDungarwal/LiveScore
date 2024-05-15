using System.ComponentModel.DataAnnotations;

namespace LiveScore.Model.ViewModel
{
    public class MatchUp
    {
        public string? MatchStatus { get; set; }
        public string MatchType { get; set; }
        public int NumberOfRound { get; set; }

        [DataType(DataType.Date)]
        public DateTime? MatchDate { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime Matchtime { get; set; }
        public int? AthleteRed { get; set; }
        public int? AthleteBlue { get; set; }
        public int? CategoryId { get; set; }
        public int? TournamentId { get; set; }
    }
}
