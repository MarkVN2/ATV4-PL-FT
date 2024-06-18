import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastro";
import Client from "../models/client";
import CPF from "../models/cpf";
import ListaPets from "./listaPets";
import ListaProdutos from "./listaProdutos";
import ListaServicos from "./listaServiços";
import Pet from "../models/pet";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Roteador (){
    const [view,setView] = useState('Clientes');

    const selecionarView = (screen: any, e : any) => {
        e.preventDefault()
        setView(screen)
    }
    async function getClients(){
        return axios.get('http://localhost:32831/cliente/clientes')
    }
    useEffect(() => {
        getClients().then((response) => {
            console.log(response.data)
        })
    }, [])
    const gerarPagina = () : any =>{
        let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Pets', 'Serviços', 'Produtos', 'Adicionar']} />
        if (view === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente clientes={} />
                </>
            )
        }
        else if(view ==='Pets') {
            return(
            <>
                {barraNavegacao}
                <ListaPets pets={pets_test} />
                
            </>
            )
        }
        else if(view ==='Serviços') {
            return(
                <>
                    {barraNavegacao}
                    <ListaServicos servicos={[]} />
                    
                </>
                )
        }
        else if(view ==='Produtos') {
            return(
                <>
                    {barraNavegacao}
                    <ListaProdutos produtos={[]} />
                    
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