using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using LiveScore.Model;

namespace LiveScoring.Model
{
    public class Athlete
    {
        public int Id { get; set; }
        public string? AthleteName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public int Contact { get; set; }

        public string? ImageUrl;

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string? CoachName { get; set; }
        public int Height { get; set; }
        public int? Weight { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int CategoryId { get; set; }

        [JsonIgnore]
        public virtual Category? Category { get; set; }
        public string Coordinater { get; set; }

        [JsonIgnore]
        public virtual ACR? acr { get; set; }

    }
}
