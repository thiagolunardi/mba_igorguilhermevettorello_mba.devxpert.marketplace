using MBA.Marketplace.Business.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MBA.Marketplace.Business.Models
{
    [Table("Categorias")]
    public class Categoria : Entity
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }
        [Required]
        [MaxLength(255)]
        public string Descricao { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
