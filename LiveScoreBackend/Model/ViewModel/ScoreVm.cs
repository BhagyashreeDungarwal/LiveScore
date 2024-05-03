using System.ComponentModel.DataAnnotations;

namespace LiveScore.Model.ViewModel
{
    public class ScoreVm
    {
        [Required]
        public int? RedPoints { get; set; }
        [Required]
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
    }
}
