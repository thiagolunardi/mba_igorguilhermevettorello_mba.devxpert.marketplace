using MBA.Marketplace.Business.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MBA.Marketplace.Business.Models
{
    [Table("Produtos")]
    public class Produto : Entity
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Descricao { get; set; }
        
        [Required]
        public string Imagem { get; set; }
        
        [Required]
        public decimal Preco { get; set; }
        
        [Required]
        public int Estoque { get; set; }
        
        [Required]
        public Guid CategoriaId { get; set; }
        
        public Categoria Categoria { get; set; }
        
        [Required]
        public Guid VendedorId { get; set; }
        
        public Vendedor Vendedor { get; set; }
        [JsonIgnore]
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public DateTime UpdatedAt { get; set; }
        [JsonIgnore]
        [Required]
        public bool Ativo { get; set; }
        [JsonIgnore]    
        [NotMapped]
        public string Src { get; set; }
    }
}
