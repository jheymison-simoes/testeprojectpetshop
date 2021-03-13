import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Itens from "./Item";

import "react-simple-hook-modal/dist/styles.css";
import "../../styles/global.css";
import "./style.css";
import "./modal-style.css";

import api from "../../services/api";


interface listProducts {
    id: number;
    description: string;
    amount: number;
    value: number;
    image: string;
    category: string;
    count: number;
    subtotal: number;
};

const titles = [
    {title: "Alimentadores e Bebedores", link: "AlimentadoresBebedores"},
    {title: "Anti Pulgas e Carrapatos", link: "AntiPulgasCarrapatos"},
    {title: "Banho", link: "Banho"},
    {title: "Banho e Tosa", link: "BanhoTosa"},
    {title: "Brinquedos", link: "Brinquedos"},
    {title: "Casas e Camas", link: "CasasCamas"},
    {title: "Consulta Veterinária", link: "ConsultaVeterinaria"},
    {title: "Produtos para Banho", link: "ProdutosBanho"},
    {title: "Petiscos", link: "Petiscos"},
    {title: "Rações", link: "Racoes"},
    {title: "Medicamentos", link: "Medicamentos"},
    {title: "Roupas e Acessórios", link: "RoupasAcessorios"},
];

function Products() {
    const groupLocation = useLocation();
    const stringPath = groupLocation.pathname.split('/');

    const indexPath = `${groupLocation.pathname}`;
    const [listProducts, setListProducts] = useState<listProducts[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalItensCart, setTotalItensCart] = useState(0);

    // Função que chama a API
    useEffect(() => {
        async function getApiProducts() {
            setLoading(true);
            await api.get(`products${indexPath}`).then( (response) => {
                const status = response.status;
    
                if(status != null){
                    setListProducts(response.data);
                }
            }).catch(()=> {
                setListProducts([]);
            });
            setLoading(false);
        }
        getApiProducts();
    }, [indexPath]);
   
    // Conta a quantiade de itens no carrinho
    const totalItens = () => {
        let totalItens = sessionStorage.length;
        setTotalItensCart(totalItens);
        console.log(totalItens);
    }

    // // Muda o titulo de cada Categorias
    // var categoryTitles = "";
    // titles.map(value => { 
    //     if(stringPath[2] == value.link){
    //         categoryTitles = value.title;
    //         return categoryTitles;
    //     }
    // });

    return (
        <div className="list-products-products">         
            <Itens arrayProducts={listProducts} totalItens={totalItens} />
        </div>
    );
}

export default Products;
