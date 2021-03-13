import React from 'react';

// Importando CSS
import '../../styles/global.css';
import './style.css';

// Importando logo
import LogoNav from '../../images/options/nav-legs.png';



function NavBar() {

    // Verificando de Está na Home
    // Se estiver não deve mostrar o Texto Vitrine dos Animais
    let getUrl = window.location.pathname;
    var texto: string;

    if(getUrl !== "/"){
        texto = "Vitrine dos Animais";
    } else {
        texto = "";
    }

    return (
        <nav className="navbar" >
            <div className="navbar-logo">
                <div className="navbar-img">
                    <img src={LogoNav} alt="Patas"/>
                    <h1 className="navbar-title">{texto}</h1>
                </div>
            </div>
            <ul className="navbar-ul">
                <li><a className="navbar-a" href="https://vitrinedosanimais.com.br/sobre-n%C3%B3s" target="_blanck">Sobre</a></li>
                <li><a className="navbar-a" href="https://vitrinedosanimais.com.br/servi%C3%A7os-%2F-produtos" target="_blanck">Serviços</a></li>
                <li><a className="navbar-a" href="https://vitrinedosanimais.com.br/contato" target="_blanck">Contatos</a></li>
                <li><a className="navbar-a" href="https://vitrinedosanimais.com.br/servi%C3%A7os-%2F-produtos" target="_blanck">Produtos</a></li>
                <li><a className="navbar-a" href="https://vitrinedosanimais.com.br/in%C3%ADcio" target="_blanck">Lojas</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;