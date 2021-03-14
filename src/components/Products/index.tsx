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

    return (
        <div className="list-products-products">         
            <Itens arrayProducts={listProducts} totalItens={totalItens} />
        </div>
    );
}

export default Products;
