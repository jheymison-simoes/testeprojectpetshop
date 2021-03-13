import React, { useState } from "react";
import ListProducts from "../../../pages/ListProducts";
import Itens from "../Item";

// CSS
import "./style.css";

interface ICart {
    openCart: boolean,
    cartOpenClose(): any
}

interface IListProducts {
    id: number;
    description: string;
    amount: number;
    value: number;
    image: string;
    category: string;
    count: number;
    subtotal: number;
};

function Cart(props: ICart) {

    const [listProducts, setListProducts] = useState<IListProducts[]>([]);
    var newListProducts: IListProducts[] = [];
    // const listProducts: IListProducts[] = [];

    // Listando itens do Session Storage

    // Object.keys(sessionStorage).forEach(function (key) {
    //     var itens = sessionStorage.getItem(key);
    //     listProducts.push(itens !== null ? JSON.parse(itens) : null);
    //     // setListProducts(itens !== null ? JSON.parse(itens) : null);
    //     console.log(listProducts);
    // });

    // for(let i = 0; i < sessionStorage.length; i++){
    //     var key = sessionStorage.key(i);
    //     var itens = sessionStorage.getItem(key !== null ? key.toString() : "");
    //     listProducts.push(itens !== null ? JSON.parse(itens) : "");
    // }

    // function getItemSession(){
    //     for(let i = 0; i < sessionStorage.length - 1; i++){
    //         var key = sessionStorage.key(i);
    //         var itens = sessionStorage.getItem(key !== null ? key.toString() : "");
    //         // listProducts.push(itens !== null ? JSON.parse(itens) : "");
    //         var itensObject = itens !== null ? JSON.parse(itens) : null;
    //         listProducts.push(itensObject);
    //         // setListProducts(listProducts);
    //     }

    //     console.log(listProducts);
    // }

    

    // getItemSession();

    // console.log(listProducts);

    
    
    // Limpando array quando fecha o carrinho
    // function clearListProducts() {
    //     setListProducts([]);
    //     console.log(listProducts);
    //     props.cartOpenClose();
    // }

        function closeCart(){
            props.cartOpenClose();
            setListProducts([]);
        }


        if(props.openCart === true){

            Object.keys(sessionStorage).forEach(function (key) {
                if(key !== "ValorTotal"){
                    const itens = sessionStorage.getItem(key);
                    listProducts.push(itens !== null ? JSON.parse(itens) : null);
                }

                

            });

            newListProducts = listProducts.filter((este, i) => listProducts.indexOf(este) === i);
            
        }
        
    return (
        <div>
            <div className={props.openCart !== false ? "overlay-cart" : ""} onClick={closeCart} ></div>

            <div className={props.openCart === false ? "cart" : "cart-open"}>

                <h1>Meu Carrinho</h1>

                {newListProducts.map(val => {

                    console.log(val.description);

                    return (
                        <>
                            <h1>Teste</h1>
                        </>
                    );                    
                })}
                
            </div>

            
        </div>
    );
}

export default Cart;