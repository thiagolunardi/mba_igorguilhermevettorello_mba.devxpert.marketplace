using MBA.Marketplace.Business.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MBA.Marketplace.Business.Models
{
    [Table("Favoritos")]
    public class Favorito : Entity
    {
        [Required]
        public Guid ProdutoId { get; set; }
        public Produto? Produto { get; set; }


        [Required]
        public Guid ClienteId { get; set; }

        public Cliente? Cliente { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}