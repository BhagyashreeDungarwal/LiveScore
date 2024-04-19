using System.ComponentModel.DataAnnotations;

namespace LiveScoring.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public int CategoryTime { get; set; }
    }
}
