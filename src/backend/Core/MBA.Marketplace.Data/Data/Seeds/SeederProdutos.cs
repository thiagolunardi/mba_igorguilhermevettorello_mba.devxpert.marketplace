using MBA.Marketplace.Business.Models;

namespace MBA.Marketplace.Data.Data.Seeds
{
    public static class SeederProdutos
    {
        public static IEnumerable<Produto> CriarProdutos(Guid eletronicoId, Guid roupaId, Guid vendedorId, Guid livroId, DateTime agora)
        {
            return new List<Produto>
            {
                new Produto
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Smartphone X100",
                        Descricao = "Smartphone de última geração com câmera de 108MP",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103ba.png",
                        Preco = 2999.90m,
                        Estoque = 15,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Camisa Social Masculina",
                        Descricao = "Camisa social de algodão premium",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bb.png",
                        Preco = 129.90m,
                        Estoque = 40,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Livro de Design de Software",
                        Descricao = "Um guia completo sobre padrões e arquitetura de software",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bc.png",
                        Preco = 89.90m,
                        Estoque = 25,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "O Senhor dos Anéis",
                        Descricao = "Fantasia épica escrita por J.R.R. Tolkien.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bd.png",
                        Preco = 49.90m,
                        Estoque = 15,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "1984",
                        Descricao = "Clássico distópico de George Orwell.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103be.png",
                        Preco = 39.90m,
                        Estoque = 20,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Dom Casmurro",
                        Descricao = "Romance de Machado de Assis sobre ciúmes e dúvida.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bf.png",
                        Preco = 29.90m,
                        Estoque = 18,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "A Revolução dos Bichos",
                        Descricao = "Allegoria política sobre o poder, por George Orwell.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bf.png",
                        Preco = 34.90m,
                        Estoque = 22,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Harry Potter e a Pedra Filosofal",
                        Descricao = "Primeiro volume da série de fantasia de J.K. Rowling.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bg.png",
                        Preco = 44.90m,
                        Estoque = 25,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Sapiens: Uma Breve História da Humanidade",
                        Descricao = "Livro de Yuval Harari sobre a evolução humana.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bh.png",
                        Preco = 59.90m,
                        Estoque = 30,
                        CategoriaId = livroId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },

                    // ELETRÔNICOS
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Smartphone iPhone 14",
                        Descricao = "Apple iPhone com 128GB e câmera avançada.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bi.png",
                        Preco = 6999.90m,
                        Estoque = 10,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Notebook Acer Aspire 5",
                        Descricao = "Notebook com Intel i7 e SSD de 512GB.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bj.png",
                        Preco = 4199.90m,
                        Estoque = 8,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Fone de Ouvido JBL",
                        Descricao = "Fone com cancelamento de ruído e bluetooth.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bl.png",
                        Preco = 399.90m,
                        Estoque = 25,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Smartwatch Xiaomi Mi Band 7",
                        Descricao = "Relógio inteligente com monitor de batimentos.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bl.png",
                        Preco = 299.90m,
                        Estoque = 40,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Echo Dot 5",
                        Descricao = "Alto-falante inteligente com Alexa.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bn.png",
                        Preco = 349.90m,
                        Estoque = 35,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Monitor Samsung 27''",
                        Descricao = "Monitor Full HD com painel VA e 75Hz.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bo.png",
                        Preco = 999.90m,
                        Estoque = 12,
                        CategoriaId = eletronicoId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },

                    // ROUPAS
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Camisa Polo Masculina",
                        Descricao = "Camisa polo de algodão premium.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bp.png",
                        Preco = 79.90m,
                        Estoque = 60,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Calça Jeans Slim Fit",
                        Descricao = "Calça jeans confortável com elastano.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bq.png",
                        Preco = 139.90m,
                        Estoque = 35,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Vestido Longo Floral",
                        Descricao = "Vestido leve ideal para o verão.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103br.png",
                        Preco = 119.90m,
                        Estoque = 25,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Jaqueta Corta-Vento",
                        Descricao = "Jaqueta leve, ideal para o dia a dia e esportes.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bt.png",
                        Preco = 199.90m,
                        Estoque = 18,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Tênis Esportivo Masculino",
                        Descricao = "Tênis com solado em EVA e ótima ventilação.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bu.png",
                        Preco = 249.90m,
                        Estoque = 28,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Blusa Moletom Unissex",
                        Descricao = "Blusa de moletom com capuz e bolso canguru.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bv.png",
                        Preco = 109.90m,
                        Estoque = 40,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Bermuda Sarja Masculina",
                        Descricao = "Bermuda confortável para uso casual.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bx.png",
                        Preco = 89.90m,
                        Estoque = 30,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    },
                    new Produto {
                        Id = Guid.NewGuid(),
                        Nome = "Regata Feminina Básica",
                        Descricao = "Regata 100% algodão, ideal para o calor.",
                        Imagem = "88568361-1db0-46a1-ba7a-8730d9a103bz.png",
                        Preco = 49.90m,
                        Estoque = 42,
                        CategoriaId = roupaId,
                        VendedorId = vendedorId,
                        CreatedAt = agora,
                        UpdatedAt = agora,
                        Ativo = true
                    }
            };
        }
    }
}
