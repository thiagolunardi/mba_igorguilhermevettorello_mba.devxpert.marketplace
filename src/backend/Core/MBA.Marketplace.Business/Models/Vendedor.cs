using MBA.Marketplace.Business.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MBA.Marketplace.Business.Models
{
    [Table("Vendedores")]
    public class Vendedor : Entity
    {
        [Required]
        [MaxLength(255)]
        public string Nome { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool Ativo { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public IEnumerable<Produto> Produtos { get; set; }
    }
}
