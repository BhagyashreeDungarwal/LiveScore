using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace LiveScoring.Model
{
    public class Round
    {
        public int Id { get; set; }
        public string? Rounds { get; set; }
        public string? NumberOfRounds { get; set; }
        public string? ScoreList { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? RoundTime { get; set; }
        public int? MatchId { get; set; }

        [JsonIgnore]
       public virtual Matchs? Match { get; set; }

    }
}
