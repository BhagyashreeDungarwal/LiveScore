using LiveScoring.Model;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LiveScore.Model
{
    public class ACR
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }

        public string ImageURL { get; set; }
        public string Contact { get; set; }

        public int Age { get; set; }

        public bool Status { get; set; } = false;

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Column(TypeName="datetime")]
        public DateTime? LastLogin { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string State { get; set; }
        public int? RoleId { get; set; }

        [JsonIgnore]
        public virtual Role? Role { get; set; }
    }
}
