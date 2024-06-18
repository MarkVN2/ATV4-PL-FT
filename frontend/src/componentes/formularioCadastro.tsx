import axios from "axios"
import Client from "../models/client";
import { useEffect, useState } from "react";

export default function FormularioCadastroCliente() {

     async function createClient(client: any) {
        const response = await axios.post('http://localhost:32831/cliente/cadastrar', client);
        return response.data;
      }
      
      const emptyClient = {
        nome: '',
        nomeSocial: '',
        email: '',
        endereco: {
          estado: '',
          cidade: '',
          bairro: '',
          rua: '',
          numero: '',
          codigoPostal: '',
          informacoesAdicionais: '',
          links: []
        },
        telefones: []
    }
    const [client, setClient] = useState(emptyClient);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
        };
      
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) :Promise<void> => {
            e.preventDefault();
            await createClient(client);
            setClient(emptyClient);
        }   
        useEffect(() => {
            console.log(client)
        }, [client])

        return (
            <div className="accordion ">
                <div className="accordion-item"  id="client">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Cliente
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="container-sm">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" name="nome" value={client.nome} onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" name="nomeSocial" value={client.nomeSocial} onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                    <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" name="email" value={client.email} onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="submit" style={{ color:'black' }}>Cadastrar</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}
