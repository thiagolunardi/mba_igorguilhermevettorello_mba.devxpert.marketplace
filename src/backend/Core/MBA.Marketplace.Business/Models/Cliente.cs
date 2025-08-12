using MBA.Marketplace.Business.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MBA.Marketplace.Business.Models
{
    [Table("Clientes")]
    public class Cliente : Entity
    {
        [Required]
        [MaxLength(255)]
        public string Nome { get; set; }

        [Required]
        public string Email { get; set; }
        [JsonIgnore]
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public DateTime UpdatedAt { get; set; }
    }
}
