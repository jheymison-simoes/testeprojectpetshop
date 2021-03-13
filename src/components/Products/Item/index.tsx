import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Alerts from "../../../alerts";

// Pages
import Cart from "../Cart";

// Icons
import { FaCartPlus, FaWindowClose } from "react-icons/fa";
import { MdShoppingCart, MdDeleteForever, MdStore } from "react-icons/md";

// Imagens
import LogoCart from "../../../images/logo-checkout.png";

// CSS
import "./style.css";

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

interface Products {
    arrayProducts: any,
    totalItens: any,
}

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

function Itens(props: Products) {

    const groupLocation = useLocation();
    const stringPath = groupLocation.pathname.split('/');
    const [countItens, setCountItens] = useState(1); // Quantidade de cada produto
    const [newCountItens, setNewCountItens] = useState(1); // Quantidade de cada produto no Carrinho
    const [openCart, setOpenCart] = useState(false); // Abre o Carrinho de Compras
    const [totalItensCart, setTotalItensCart] = useState(0); // Quaantidade de Itens no carrinho
    const [listProducts, setListProducts] = useState<IListProducts[]>([]);
    const [valueTotal, setValueTotal] = useState(0);

    // Conta a quantiade de itens no carrinho
    function totalItensStorage() {
        var itens = 0;
        for(let i = 0; i < sessionStorage.length; i++){
            if(sessionStorage.key(i) !== "ValorTotal"){
                itens++;
            }   
        }
        setTotalItensCart(itens);
        return itens;
        
    }

    // Muda o titulo de cada Categorias
    var categoryTitles = "";
    titles.map(value => { 
        if(stringPath[2] == value.link){
            categoryTitles = value.title;
            return categoryTitles;
        }
    });

    function getItensSession() {
        Object.keys(sessionStorage).forEach(function (key) {
            if(key !== "ValorTotal"){
                const itens = sessionStorage.getItem(key);
                
                const itensFormat = itens !== null ? JSON.parse(itens) : null;

                const data = {
                    id: Number(itensFormat.id),
                    description: itensFormat.description,
                    amount: Number(itensFormat.amount),
                    value: Number(itensFormat.value),
                    image: itensFormat.image,
                    category: itensFormat.category,
                    count: Number(itensFormat.count),
                    subtotal: Number(itensFormat.value) * Number(itensFormat.count),
                }

                listProducts.push(data);
            }
        });

        return setListProducts(listProducts);
    }

    function totalValue(){
        var total = 0;
        var subTotalItem = 0;

        listProducts.map( products =>{
            // total = Number(value.subtotal) + total;
            subTotalItem = products.count * products.value;
            total = subTotalItem + total;
        })
        return total;
    }

    function cartOpen() {
        if(totalItensStorage() > 0){
            setOpenCart(true);
            getItensSession();
            // const total = totalValue();
            setValueTotal(totalValue());
            sessionStorage.setItem("ValorTotal", totalValue().toString());
        } else {
            Alerts.emptyCart();
            setListProducts([]);
        }
    }

    function cartClose() {
        setOpenCart(false);
        setListProducts([]);
    }

    return (
        <>
        <div className="list-products-top">
            <div className="title-category">
                <h1>{categoryTitles}</h1>
            </div>

            <div className="list-products-products-group">
                <button className="list-products-top-btn" type="button" onClick={ cartOpen }>
                    <MdShoppingCart />
                </button>
                <div className="list-products-top-total-itens">{ totalItensCart }</div>
            </div>

            <div className="btn-float">
                <button className="btn-cart-float" type="button" onClick={ cartOpen }>
                    <h1><MdShoppingCart/>Meus Itens</h1>
                    
                </button>
                <div className="qtd-itens-cart">
                        <h1>{ totalItensCart }</h1>
                    </div>
            </div>
            
        </div>

        <div className="center-products">
            {props.arrayProducts.map( (products: IListProducts) => {
                
                products.count = products.count == null ? 1 : products.count;
                let value = Number(products.value);
                products.subtotal = value * products.count;
                const subTotalFormat = products.subtotal.toFixed(2).toString().replace(".", ",");

                // Verifica se há Repetidos
                function repeat(item: string){
                    if(sessionStorage.getItem(item)){
                        Alerts.alertRepeat();
                        return true;
                    } else {
                        return false;
                    }
                }

                // Aumenta a Quantidade de cada item
                function increment() {

                    if( repeat( products.id.toString() ) ){
                        Alerts.alertRepeatQty();
                    } else {
                        if(products.count >= products.amount){
                            products.count = products.amount;
                            Alerts.alertIncrement(products.count);
                        } else {
                            products.count = products.count + 1;
                            products.subtotal = value * products.count;
                            
                        }
                        setCountItens(products.count);
                    }
                    setListProducts(listProducts);
                }

                // Diminui a Quantidade de cada Item
                function decrement() {
                    if( repeat( products.id.toString() ) ){
                        Alerts.alertRepeatQty();
                    } else {
                        if(products.count <= 1){
                            Alerts.alertDecrement();
                            products.count = 1;
                        } else {   
                            products.count = products.count - 1;
                            products.subtotal = value * products.count;
                        }
                        setCountItens(products.count);
                    }                    
                }

                // Altera o Estado da Quantidade de Cada Item
                const handleChange = (event: any) => {
                    setCountItens(products.count);
                }

                // const subTotalFormat = products.subtotal;

                // Adiciona o Item na Session storage
                function addItemSession(){
                    // Guarda os Produtos em um Objeto
                    const data = {
                        id: products.id,
                        image: products.image,
                        description: products.description,
                        amount: products.amount,
                        value: products.value,
                        subtotal: Number(products.subtotal),
                        count: products.count
                    };

                    if( !repeat( data.id.toString() ) ){
                        sessionStorage.setItem(
                            products.id.toString(),
                            JSON.stringify(data)
                        );

                        // getItensSession();
                        cartOpen();
                        
                    } else {
                        setListProducts([]);
                    }

                    // cartOpenClose(); // Abre ou fecha o carrinho
                }

                return (

                    <>
                    <div className="local-products" key={products.id}>
                        <div className="details-products">
                            <div className="header-products">
                                <img
                                    src={products.image}
                                    alt="Comedouro para Cachorro"
                                    className="header-img-products"
                                />
                            </div>
                            <div className="body-products">
                                <div className="body-description-products">
                                    {products.description}
                                </div>
                                <div className="body-options">
                                    <div className="body-options-products">
                                        Disponível: {products.amount}
                                        <br></br>
                                        Categoria: {categoryTitles}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-products">
                            <div className="footer-input-products">
                                <button className="btn-decrement" onClick={decrement}>-</button>
                                <input type="number" className="qtd-input-products" value={products.count} onChange={handleChange} />
                                <button className="btn-increment" onClick={increment}>+</button>
                            </div>
                            <button className="btn-submit" onClick={addItemSession}>
                                <FaCartPlus/>
                                <div className="body-value-products">
                                    R$ <span>{ subTotalFormat }</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    </>
                );

            })}

        </div>
        
        {/* <Cart openCart={openCart} cartOpenClose={cartOpenClose} /> */}

        <div>
            <div className={openCart !== false ? "overlay-cart" : ""} onClick={cartClose} ></div>
            
            <div className={openCart === false ? "cart" : "cart-open"}>
                <div className="my-cart">
                    <img src={LogoCart} className="cart-logo"/>
                    <div className="header-cart">
                        <FaWindowClose className="icon-close-cart" onClick={ cartClose }/>
                        <div className="title-header-cart">
                            <h1><MdStore/>Meus Itens</h1>
                            <h4>Itens: {totalItensCart}</h4>
                        </div>
                    </div>
                    <div className="layout-cart-products">
                        {listProducts.map( (products, i) => {

                    
                            const valueOfNumber = Number(products.value);
                            // const subtotalOfNumber = Number(products.subtotal);


                            function valueSubTotal() {
                                const valueItem = valueOfNumber * products.count;
                                // const valueItemFormat = valueItem.toFixed(2).toString().replace(".", ","); //Formatando Valor

                                return valueItem;
                            }

                            function setItemSession(){
                                const getItemSession = sessionStorage.getItem(products.id.toString());
                                const itemSession = getItemSession !== null ? JSON.parse(getItemSession) : null;

                                itemSession.count = products.count;
                                itemSession.subtotal = valueSubTotal();

                                sessionStorage.setItem(products.id.toString(), JSON.stringify(itemSession));
                            }


                            function deleteItem() {
                                const item = products.id;
                            
                                sessionStorage.removeItem(item.toString());
                                listProducts.splice(i, 1);

                                setTotalItensCart(totalItensStorage());
                            
                                if(sessionStorage.length - 1 <= 0 ){
                                    cartClose();
                                }

                                setValueTotal(totalValue());
                                sessionStorage.setItem("ValorTotal", totalValue().toString());
                            }

                            // Aumenta a Quantidade de cada item
                            function increment() {
                                if(products.count >= products.amount){
                                    products.count = products.amount;
                                    Alerts.alertIncrement(products.count);
                                } else {
                                    products.count = products.count + 1;
                                    valueSubTotal();
                                    setItemSession();

                                    setNewCountItens(products.count);
                                    setValueTotal(totalValue());
                                    sessionStorage.setItem("ValorTotal", totalValue().toString());
                                }
                            }

                            // Diminui a Quantidade de cada Item
                            function decrement() {
                                if(products.count <= 1){
                                    Alerts.alertDecrement();
                                    products.count = 1;
                                } else {   
                                    products.count = products.count - 1;
                                    valueSubTotal();
                                    setItemSession();

                                    setNewCountItens(products.count);
                                    setValueTotal(totalValue());
                                    sessionStorage.setItem("ValorTotal", totalValue().toString());
                                }
                            }

                            const subTotalFormat = valueSubTotal().toFixed(2).toString().replace(".",",");

                            return (
                                
                                <div className="cart-products" key={products.id}>
                                    <div className="local-products cart-local-products">
                                        <div className="details-products">
                                            <div className="header-products">
                                                <img
                                                    src={products.image}
                                                    alt="Comedouro para Cachorro"
                                                    className="header-img-products"
                                                />
                                            </div>
                                            <div className="body-products cart-body-products">
                                                <div className="body-description-products ">
                                                    {products.description}
                                                </div>
                                                <div className="body-options">
                                                    <div className="body-options-products">
                                                        Disponível: {products.amount}
                                                        <br></br>
                                                        Categoria: {categoryTitles}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-delete-item" onClick={deleteItem}>
                                                <MdDeleteForever />
                                            </div>
                                        </div>
                                        <div className="footer-products cart-products-footer">
                                            <div className="footer-input-products">
                                                <button className="btn-decrement" onClick={decrement}>-</button>
                                                <input type="number" className="qtd-input-products" value={products.count}/>
                                                <button className="btn-increment" onClick={increment}>+</button>
                                            </div>
                                            <button className="btn-submit cart-btn-submit">
                                                <div className="body-value-products cart-body-value-products">
                                                    R$ <span>{ subTotalFormat }</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            );
                        })}
                    </div>
                    
                </div>
                <div className="cart-footer-products">
                    <button className="btn-cart-checkout">
                        {/* <p> </p> */}
                        
                        <div className="cart-payment">
                            Checkout <span> R$ </span>{ valueTotal.toFixed(2).toString().replace(".", ",") }
                        </div>

                    </button>

                    <button className="btn-cart-checkout btn-cart-pet">
                        <p>Escolher Outro Pet </p>
                    </button>

                </div>
            </div>

                        
        </div>

        </>
        
    );
}

export default Itens;