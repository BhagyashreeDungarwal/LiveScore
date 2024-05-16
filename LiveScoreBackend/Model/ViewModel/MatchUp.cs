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
        public string? Gender { get; set; }
        public int? AthleteRed { get; set; }
        public int? AthleteBlue { get; set; }
    }
}
