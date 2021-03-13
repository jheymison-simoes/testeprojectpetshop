import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';


// Importando CSS dos Slider Slick
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

// Importando CSS dos Slider modificado
import './style.css';

// Importando Imagens
import Alimentador from '../../images/category/feeder.png';
import AntiPulgas from '../../images/category/fleas.png';
import Banho from '../../images/category/shower.png';
import BanhoTosa from '../../images/category/shear.png';
import Brinquedos from '../../images/category/toys.png';
import CasasCamas from '../../images/category/houses.png';
import ConsultaVeterinaria from '../../images/category/query.png';
import ProdutosBanho from '../../images/category/products.png';
import Petiscos from '../../images/category/snacks.png';
import Racoes from '../../images/category/rations.png';
import Medicamentos from '../../images/category/medicines.png';
import RoupasAcessorios from '../../images/category/clothes.png';


export default class SwipeToSlide extends Component {
    render() {
        const groupPath = window.location.pathname;
        const newGroupPath = [];
        const stringPath = groupPath.split('/');
                        
        for(let i = 0; i < stringPath.length; i++){
            if(i === 1){
                newGroupPath.push(stringPath[i])
            } 
        }

        const pathGroup = '/'+newGroupPath.toString();

        // Configurações do Slide
        const settings = {
            className: "center",
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                }
            ]
        };

        // Guardando dados para o slide em um objeto
        const categorys = [
            {
                img: Alimentador,
                legend: 'Alimentadores e Bebedores',
                alt: 'Alimentadores e Bebedores',
                link: pathGroup+'/AlimentadoresBebedores',
            },
            {
                img: AntiPulgas,
                legend: 'Anti Pulgas e Carrapatos',
                alt: 'Anti Pulgas e Carrapatos',
                link: pathGroup+'/AntiPulgasCarrapatos'
            },
            // {
            //     img: Banho,
            //     legend: 'Banho',
            //     alt: 'Banho',
            //     link: pathGroup+'/Banho',
            // },
            // {
            //     img: BanhoTosa,
            //     legend: 'Banho e Tosa',
            //     alt: 'Banho e Tosa',
            //     link: pathGroup+'/BanhoTosa',
            // },
            {
                img: Brinquedos,
                legend: 'Brinquedos',
                alt: 'Brinquedos',
                link: pathGroup+'/Brinquedos',
            },
            {
                img: CasasCamas,
                legend: 'Casas e Camas',
                alt: 'Casas e Camas',
                link: pathGroup+'/CasasCamas',
            },
            // {
            //     img: ConsultaVeterinaria,
            //     legend: 'Consulta Veterinária',
            //     alt: 'Consulta Veterinária',
            //     link: pathGroup+'/ConsultaVeterinaria',
            // },
            {
                img: ProdutosBanho,
                legend: 'Produtos para Banho',
                alt: 'Produtos para Banho',
                link: pathGroup+'/ProdutosBanho',
            },
            {
                img: Petiscos,
                legend: 'Petiscos',
                alt: 'Petiscos',
                link: pathGroup+'/Petiscos',
            },
            {
                img: Racoes,
                legend: 'Rações',
                alt: 'Rações',
                link: pathGroup+'/Racoes',
            },
            {
                img: Medicamentos,
                legend: 'Medicamentos',
                alt: 'Medicamentos',
                link: pathGroup+'/Medicamentos',
            },
            {
                img: RoupasAcessorios,
                legend: 'Roupas e Acessórios',
                alt: 'Roupas e Acessórios',
                link: pathGroup+'/RoupasAcessorios',
            }
        ]

        return (
        // <div className="slider-container">
            <div className="slider-slick-container">
                <Slider {...settings}>
                    {categorys.map((x, i) => {
                        return (
                            <Link to={x.link} key={i} type="button" className="slider-slick-items" >
                                <div className="slider-slick-image">
                                    {/* <img src={x.img} alt={x.alt}/> */}
                                </div>
                                <p className="slider-slick-legend">
                                    {x.legend}
                                </p>
                            </Link>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}


