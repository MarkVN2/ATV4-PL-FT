import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastro";
import { useState } from "react";




export default function Roteador (){
    const [view,setView] = useState('Clientes');
    const selecionarView = (screen: any, e : any) => {
        e.preventDefault()
        setView(screen)
    }
    const gerarPagina = () : any =>{
        let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Clientes',  'Adicionar']} />
        if (view === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente />
                </>
            )
        }
         else if(view ==='Adicionar') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente />
                </>
            )
        }
    }
    return (gerarPagina())
}