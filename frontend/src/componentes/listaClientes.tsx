import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Client from "../models/client";
import { useEffect, useState } from "react";
import axios from "axios";



export default function ListaClientes() {
    const [clients, setClients] = useState({
        clientes: [] as Client[]

    });
    const [selectedClient, setClient] = useState({} as Client);
    async function readClients() {
        setClients({ clientes: await fetch('http://localhost:32831/cliente/clientes').then(response => response.json()) })
    }

    async function readClient(id: string) {
        const response = await axios.get(`http://localhost:32831/cliente/${id}`);
        return response.data as Client;
    }


    async function updateClient(client: Client) {
        const response = await axios.put('http://localhost:32831/cliente/atualizar', client);
        readClients();
        return response.data;
    }

    async function deleteClient(client: Client) {
        const response = await axios.delete('http://localhost:32831/cliente/excluir', { data: client });
        return response.data;
    }
    useEffect(() => {
        console.log('Lista de clientes renderizada')
        readClients()
    }, [])
    useEffect(() => {
        console.log(clients)
        
    }, [clients])
    useEffect(() => {
        console.log(selectedClient)
    }, [selectedClient])
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setClient(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <div className="container-fluid">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Nome Social</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.clientes.map((client, index) => {
                            return (

                                <tr key={index}>
                                    <td>{client.nome}</td>
                                    <td>{client.nomeSocial}</td>
                                    <td>{client.email}</td>
                                    <td><button onClick={() => deleteClient(client)} className="btn btn-primary">Deletar</button></td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#modal${client.id}`}
                                            onClick={() => setClient(client)}
                                        >
                                            Editar
                                        </button>
                                        <div className="modal" id={`modal${client.id}`}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title text-black">Editar {client.nomeSocial}</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={(event) =>{ event.preventDefault(); updateClient(selectedClient) }}>
                                                            <div className="input-group mb-3">
                                                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" name="nome" value={selectedClient.nome} onChange={handleChange} />
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" name="nomeSocial" value={selectedClient.nomeSocial} onChange={handleChange} />
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">@</span>
                                                                <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" name="email" value={selectedClient.email ? selectedClient.email : ''} onChange={handleChange} />
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}