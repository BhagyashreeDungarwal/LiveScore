using System.ComponentModel.DataAnnotations;

namespace LiveScore.Model.ViewModel
{
    public class MatchVm
    {
        
        public string? MatchStatus { get; set; }
        [Required]
        public string MatchType { get; set; }
        [Required]
        public int NumberOfRound { get; set; }
        [Required]

        [DataType(DataType.Date)]
        public DateTime? MatchDate { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime Matchtime { get; set; }
        [Required]
        public int? AthleteRed { get; set; }
        [Required]
        public int? AthleteBlue { get; set; }
        public int? CategoryId { get; set; }
        public int? TournamentId { get; set; }

    }
}
