import { useState, useEffect, useContext } from "react"
import Header from "../../components/header"
import Title from "../../components/Title"
import './new.css'
import { FiPlusCircle } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc, addDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

const listRef = collection(db, "customers");

export default function New() {

    const { user } = useContext(AuthContext)
    const { id } = useParams()


    const [customers, setCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)
    const [loadCustomers, setLoadCustomer] = useState(true)
    const [complemento, setComplemento] = useState()
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [idCustomer, setIdCustomer] = useState(false)

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

                    if (id) {
                        loadId(lista)
                    }

                })
                .catch((error) => {
                    toast("Algo deu Errado")
                    setLoadCustomer(false)
                    setCustomer([{ id: '1', nomeFantasia: "Cliente com erro" }])
                })
        }
        loadCustomers()
    }, [id, loadId])

    async function loadId(lista) {
        const docRef = doc(db, "chamados", id)
        await getDoc(docRef)
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto)
                setStatus(snapshot.data().status)
                setComplemento(snapshot.data().complemento)

                let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
                setCustomerSelected(index)
                setIdCustomer(true)

            }).catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })
    }


    function handleOptionChange(e) {
        setStatus(e.target.value)
    }
    function handleChangeSelect(e) {
        setAssunto(e.target.value)


    }
    function handleChangeCustomers(e) {
        setCustomerSelected(e.target.value)

    }
    async function handleRegister(e) {
        e.preventDefault()

        if (idCustomer) {

        }

        await addDoc(collection(db, 'chamados'), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
            nomeResponsavel: user.name
        })
            .then(() => {
                toast.success("Chamado Registrado");
                setComplemento('')
                setCustomerSelected(0)
            }).catch((error) => {
                toast.error("Ops erro ao Registrar")
                console.log(error)
            })
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
                        className="form-profile" onSubmit={handleRegister}>
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