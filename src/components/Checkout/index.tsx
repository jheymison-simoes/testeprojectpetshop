import React, { useState, FormEvent } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import MaskedInput from 'react-text-mask';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Importando CSS
import "../../styles/global.css";
import "./style.css";

// Importando logo
import LogoNav from "../../images/logo-checkout.png";

// Interfaces
interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}
console.log(window.location.pathname);

function noCheckout(){
    if(sessionStorage.length === 0 && window.location.pathname === "/checkout"){
        window.location.replace("/");
    }
}
noCheckout();

  
// Customização dos Inputs
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

// Customização dos Inputs
const CssSelect = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                '&.MuiOutlinedInput-notchedOutline fieldset': {
                    borderColor: 'green',
                },
            },
        },
    },
})(Select);

function TextMaskCustom(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;
  
    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
            inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Checkout() {

    const classes = useStyles();


    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');

    const [phone, setPhone] = useState({
        phonemask: '( )    -    ',
    });

    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone({
            ...phone,
            [event.target.name]: event.target.value,
        });
    };

    const [payment, setPayment] = React.useState('');
    const handleChangeSelectPayment = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPayment(event.target.value as string);
    };

    const [withdrawal, setWithdrawal] = React.useState('');
    const handleChangeSelectWithdrawal = (event: React.ChangeEvent<{ value: unknown }>) => {
        setWithdrawal(event.target.value as string);
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const dados = {
            "nome": name,
            "rua": street,
            "numero": number,
            "bairro": neighborhood,
            "telefone": phone,
            "forma de Pagamento": payment,
            "forma de retirada": withdrawal
        }

        const linkWhatsApp = "https://api.whatsapp.com/send?phone=";

        const destinyPhone = "5534996751548";

        const sizeSession = sessionStorage.length - 1;
        const valueTotal = sessionStorage.getItem("ValorTotal");
        const formatValueTotal = Number(valueTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        console.log(formatValueTotal);

        var listProducts: any = [];
        Object.keys(sessionStorage).forEach(function (key) {
            if(key !== "ValorTotal"){
                const itens = sessionStorage.getItem(key);
                const formatItens = itens != null ? JSON.parse(itens) : null;
                listProducts.push(formatItens);
            }
            
        });

        var arrayPedido: any = [];
        
        listProducts.map((value: any, i: number) => {
            var produto = value.description;
            var qtd = value.count;
            var subtotal = value.subtotal;
            var formatSubtotal = subtotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            var header = "";
            var dadosCliente = "";

            if(i === 0){
                header = "Meu(s) Pedido(s):\n--------------------\n\n";
            }

            var pedidos =   "*Produto*: "+ produto + "\n" + 
                            "*Quantidade*: " + qtd + "\n" + 
                            "*Subtotal*: " + formatSubtotal + "\n" +
                            "--------------------\n";
            
            if(sizeSession === i + 1){
                dadosCliente = "\n--------------------\n" +
                               "\n*_Valor Total_*: " + formatValueTotal + "\n" +
                               "\n--------------------\n" +
                               "\n*Dados do Cliente*:\n" +
                               "*Nome*: " + dados.nome + "\n" +
                               "*Telefone*: " + dados.telefone.phonemask + "\n" +
                               "*Endereço*: \n" +
                               "*Rua / Av.*: " + dados.rua + "\n" +
                               "*Número*: " + dados.numero + "\n" +
                               "*Bairro*: " + dados.bairro + "\n" +
                               "*Forma de Pagamento*: " + dados["forma de Pagamento"] + "\n" +
                               "*Forma de Retirada*: " + dados["forma de retirada"] + "\n";
                
            }

            var textoPedido = header + pedidos + dadosCliente;
            arrayPedido.push(textoPedido);
        });

        var listaPedidos = arrayPedido.join("");
        var encoderPedido = window.encodeURIComponent(listaPedidos.toString());
        await window.open(linkWhatsApp + destinyPhone + "&text=" + encoderPedido, "_blank");

        sessionStorage.clear();
        return window.location.replace("/");
    }

    return (
        <div className="container-checkout">
            <img
                className="container-logo-cehckout"
                src={LogoNav}
                alt="Logo Petshop"
            />

            <div className="content-checkout">
                    <h2 className="content-title-checkout">
                        Para finalizar seu pedido precisamos de alguns dados!
                    </h2>
                    <form onSubmit={handleSubmit} className="content-form-checkout">
                        <CssTextField
                            id="form-input-name"
                            className={classes.margin + " form-input-name"}
                            label="Seu Nome Completo"
                            variant="outlined"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            required
                        />

                        <div className="form-address">
                            <CssTextField
                                id="form-input-street"
                                className={classes.margin + " form-input-street"}
                                label="Rua / Avenida"
                                variant="outlined"
                                value={street}
                                onChange={event => setStreet(event.target.value)}
                                required
                            />

                            <CssTextField
                                id="form-input-number"
                                className={classes.margin + " form-input-number"}
                                label="Nº"
                                variant="outlined"
                                type="number"
                                value={number}
                                onChange={event => setNumber(event.target.value)}
                                required
                            />

                            <CssTextField
                                id="form-input-neighborhood"
                                className={classes.margin + " form-input-neighborhood"}
                                label="Bairro"
                                variant="outlined"
                                value={neighborhood}
                                onChange={event => setNeighborhood(event.target.value)}
                                required
                            />

                            <CssTextField
                                value={phone.phonemask}
                                onChange={handleChangePhone}
                                name="phonemask"
                                id="formatted-text-mask-input"
                                className={classes.margin + " form-input-phone"}
                                label="Telefone"
                                variant="outlined"
                                InputProps={{
                                    inputComponent: TextMaskCustom as any,
                                }}
                                required
                            />

                            <FormControl variant="outlined" className={classes.formControl + " form-select-payment"} required>
                                <InputLabel id="demo-simple-select-outlined-label">Forma de Pagamento</InputLabel>
                                <CssSelect
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="Forma de Pagamento"
                                    value={payment}
                                    onChange={handleChangeSelectPayment}
                                    
                                >
                                    <MenuItem value="Cartão">Cartão Débito / Crédito</MenuItem>
                                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                                </CssSelect>
                            </FormControl>

                            <FormControl variant="outlined" className={classes.formControl + " form-select-withdrawal"} required>
                                <InputLabel id="demo-simple-select-outlined-label">Forma de Retirada</InputLabel>
                                <CssSelect
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={withdrawal}
                                    onChange={handleChangeSelectWithdrawal}
                                    label="Forma de Retirada"
                                    
                                >
                                    <MenuItem value="Entrega">Entrega</MenuItem>
                                    <MenuItem value="Retirada na Loja">Retirada na Loja</MenuItem>
                                </CssSelect>
                            </FormControl>
                        </div>

                        <button 
                            className="form-btn-final"
                            type="submit"
                        >
                            Enviar Pedido
                        </button>
                        <p className="form-warning">*Voce Será redirecionado ao Whatsapp para o vendedor confirmar o pedido!</p> 
                    </form>
            </div>
        </div>
    );
}

export default Checkout;
