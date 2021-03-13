import React, { Component, useState } from 'react';

import Slide from '../../components/SliderSlick';
import NavBarResponsive from '../../components/NavBarResposive';
import Product from '../../components/Products';

// Importando estilos
import '../../styles/global.css';
import './style.css';

// interface Products {
//     id: number;
//     description: string;
//     value: number;
//     image: string;
// };

// interface IProducts {
//     products: Products[];
// }

function ListProducts() {

    const [navBarOpen, setNavBarOpen] = useState(false);

    function handleNavBar() {
        if(navBarOpen == true){
            setNavBarOpen(false);
        } else {
            setNavBarOpen(true)
        } 
    }

    
        return (
            <div id="list-products">
                <div className="list-products-nav">
                    <NavBarResponsive 
                        navbarState={navBarOpen} 
                        handleNavbar={handleNavBar} 
                    />
                </div>

                <div className="list-products-category" 
                    
                >
                    <h1 className="list-products-title">Oque você procura?</h1>
                    <div className="list-products-slider">
                        <Slide />
                    </div>
                </div>

                
                <Product />
                
            </div>
        )
    
}

export default ListProducts;