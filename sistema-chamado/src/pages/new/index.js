import Header from "../../components/header"
import Title from "../../components/Title"
import './new.css'
import { FiPlusCircle } from 'react-icons/fi'

export default function New() {
    return (
        <div>
            <Header />

            <div className="content">
                <Title name='Novo chamado'>
                    <FiPlusCircle size={25} />
                </Title>
                <div className="container">
                    <form
                        className="form-profile">
                        <label>Clientes</label>
                        <select >
                            <option key={1} value={1}>Mercado Teste</option>
                            <option key={2} value={2}>Mercado Teste</option>
                            <option key={3} value={3}>Mercado Teste</option>
                            <option key={4} value={4}>Mercado Teste</option>
                        </select>
                        <label>Assunto</label>
                        <select >
                            <option key={1} value="suporte">Suporte</option>
                            <option key={2} value="Visita Tecnica">Visita Tecnica</option>
                            <option key={3} value="Financeiro">Financeiro</option>
                        </select>
                    </form>

                </div>
            </div>
        </div>
    )
}