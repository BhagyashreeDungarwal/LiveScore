using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace LiveScoring.Model
{
    public class Tournament
    {
        public int TId { get; set; }
        public string? TournamentName { get; set; }
        public string? Location { get; set; }

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? TournamentDate { get; set; }

        public int? CategoryId { get; set; }

        [JsonIgnore]
        public virtual Category? Category { get; set; }

    }
}
