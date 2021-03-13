import Swal from "sweetalert2";

const alerts = {
    // Alertas Personalizados para Quantidade de Itens
    alertDecrement() {
        Swal.fire({
            icon: 'info',
            title: 'Ops!...',
            text: 'Quantidade Minima 1!',
            confirmButtonColor: '#4abdac',
        });
    },

    alertIncrement(value: number) {
        Swal.fire({
            icon: 'info',
            title: 'Ops!...',
            text: 'Quantidade Máxima '+value+ '!',
            confirmButtonColor: '#4abdac',
        });
    },

    alertRepeat() {
        Swal.fire({
            icon: 'info',
            title: 'Ops!...',
            text: 'Produto ja adicionado ao Carrinho!',
            confirmButtonColor: '#4abdac',
        });
    },

    alertRepeatQty() {
        Swal.fire({
            icon: 'info',
            title: 'Ops!...',
            text: 'Produto ja adicionado ao Carrinho! Altere a Quantidade no Carrinho.',
            confirmButtonColor: '#4abdac',
        });
    },

    emptyCart() {
        Swal.fire({
            icon: 'info',
            title: 'Ops!...',
            text: 'O Carrinho só pode ser aberto se estiver com produto!',
            confirmButtonColor: '#4abdac',
        });
    }
}

export default alerts;