import { useState, useEffect, useContext } from "react"
import Header from "../../components/header"
import Title from "../../components/Title"
import './new.css'
import { FiPlusCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc } from "firebase/firestore"
import { toast } from "react-toastify"

const listRef = collection(db, "customers");

export default function New() {

    const { user } = useContext(AuthContext)
    const [customers, setCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)
    const [loadCustomers, setLoadCustomer] = useState(true)
    const [complemento, setComplemento] = useState()
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')

    useEffect(() => {
        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let lista = []
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })
                    if (snapshot.docs.size === 0) {
                        console.log("NENHUMA EMPRESA ENCONTRADA")
                        setCustomer([{ id: '1', nomeFantasia: "Nenhum Cliente Cadastrado" }])
                        setLoadCustomer(false)
                        return
                    }

                    setCustomer(lista)
                    setLoadCustomer(false)

                })
                .catch((error) => {
                    toast("Algo deu Errado")
                    setLoadCustomer(false)
                    setCustomer([{ id: '1', nomeFantasia: "Cliente com erro" }])
                })
        }
        loadCustomers()
    }, [])


    function handleOptionChange(e) {
        setStatus(e.target.value)
    }
    function handleChangeSelect(e) {
        setAssunto(e.target.value)
        alert(e.target.value)

    }
    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value)

    }


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
                        {
                            loadCustomers ? (
                                <input type="text" disabled={true} value="...Carregando" />
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomers}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index}
                                                value={index}>
                                                {index + 1}    {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option key={1} value="suporte">Suporte</option>
                            <option key={2} value="Visita Tecnica">Visita Tecnica</option>
                            <option key={3} value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'} />
                            <span>Em aberto</span>

                            <input type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'} />
                            <span>Em Progresso </span>

                            <input type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'} />
                            <span>Atendido</span>

                        </div>
                        <label>Complemento</label>
                        <textarea type="text"
                            placeholder="descreva seu problema"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)} />
                        <button type="submit">Registrar</button>
                    </form>

                </div>
            </div>
        </div>
    )
}