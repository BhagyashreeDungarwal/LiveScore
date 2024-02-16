using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LiveScoring.Model
{
    public class Matchs
    {
        public int MId { get; set; }
        public string? MatchStatus { get; set; }
        public string? MatchType { get; set; }
        public int NumberOfRound { get; set; }

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? MatchDate { get; set; }

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? Matchtime { get; set; }
        public int? AthleteRed { get; set; }
        public int? AthleteBlue { get; set; }
        public int? CategoryId { get; set; }
        public int? TournamentId  { get; set; }
        [JsonIgnore]
        public virtual Tournament? Tournament { get; set; }

        [JsonIgnore]
        public virtual Category? Category { get; set; }

        [JsonIgnore]
        public virtual Athlete? Athlete { get; set; }

    }
}
