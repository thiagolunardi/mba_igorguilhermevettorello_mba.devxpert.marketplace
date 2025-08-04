using AutoMapper;
using MBA.Marketplace.Business.Models;
using MBA.Marketplace.MVC.ViewModels;

namespace MBA.Marketplace.MVC.Configurations
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<ProdutoViewModel, ProdutoFormViewModel>()
                .ForMember(dest => dest.Imagem, opt => opt.Ignore());

            CreateMap<ProdutoFormViewModel, ProdutoViewModel>()
                .ForMember(dest => dest.Imagem, opt => opt.Ignore());

            CreateMap<Categoria, CategoriaViewModel>();

            CreateMap<Categoria, CategoriaFormViewModel>();

            CreateMap<Produto, ProdutoViewModel>()
                .ForMember(dest => dest.Src, opt => opt.MapFrom(src => src.Imagem))
                .ForMember(dest => dest.Imagem, opt => opt.Ignore())
                .ForMember(dest => dest.Vendedor, opt => opt.Ignore());

            CreateMap<Produto, ProdutoFormViewModel>()
                .ForMember(dest => dest.Src, opt => opt.MapFrom(src => src.Imagem))
                .ForMember(dest => dest.Imagem, opt => opt.Ignore());

            CreateMap<Vendedor, VendedorViewModel>().ReverseMap();
        }
    }
}
