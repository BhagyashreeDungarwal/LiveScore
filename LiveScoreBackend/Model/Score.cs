using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LiveScoring.Model
{
    public class Score
    {
        public int ScoreId { get; set; }
        public int? RedPoints { get; set; }
        public int? BluePoints { get; set; }
        public string? ScoreType { get; set; }
        public string PaneltyPlayer { get; set; }
        public string Panelty { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime? ScoreTime { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime PaneltyTime { get; set; }
        public int? Rounds { get; set; }
        public int? AthleteRed { get; set; }
        public int? AthleteBlue { get; set; }
        public int? MatchId { get; set; }

        [JsonIgnore]
        public virtual Matchs? Match { get; set; }

        [JsonIgnore]
        public virtual Round? Round { get; set; }


        [JsonIgnore]
        public virtual Athlete? AthleteRedObj { get; set; }

        [JsonIgnore]
        public virtual Athlete? AthleteBlueObj { get; set; }

    }
}
