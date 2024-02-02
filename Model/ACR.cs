using LiveScoring.Model;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LiveScore.Model
{
    public class ACR
    {
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string Image;
        public int Contact { get; set; }

        public int Age { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [DataType(DataType.DateTime)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? LastLogin { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string State { get; set; }
        public int? RoleId { get; set; }

        [JsonIgnore]
       public virtual Role? Role { get; set; }

    }
}
