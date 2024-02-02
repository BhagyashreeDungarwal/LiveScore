using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LiveScoring.Model
{
    public class Score
    {
        public int ScoreId { get; set; }
        public string? RedPoints { get; set; }
        public string? BluePoints { get; set; }
        public string? ScoreType { get; set; }
        public string PaneltyPlayer { get; set; }
        public string Panelty { get; set; }
       

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ScoreTime { get; set; }
        
        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime PaneltyTime { get; set; }
        public int? Rounds { get; set; }
        public int? AthleteRed { get; set; }
        public int? AthleteBlue { get; set; }

        [JsonIgnore]
        public virtual Round? Round { get; set; }

       [JsonIgnore]
       public virtual Athlete Athlete { get; set; } 
    }
}
