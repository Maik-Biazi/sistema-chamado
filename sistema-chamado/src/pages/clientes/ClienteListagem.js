import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/header';
import './dashboard.css'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { format } from 'date-fns'
import Modal from '../../components/Modal'

const listRef = collection(db, "clientes")

export default function ClienteListagem() {
    const { logout } = useContext(AuthContext);
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)
    const [detail, setDetail] = useState()

    useEffect(() => {
        async function loadClientes() {
            const clientesFiltrados = query(listRef, orderBy('created', 'desc'), limit(5))

            const querySnapshot = await getDocs(clientesFiltrados)
            setClientes([])
            await updateState(querySnapshot)
            setLoading(false)
            console.log(querySnapshot)
        }
        loadClientes()

        return () => { }
    }, [])

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = []
            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nomeFantasia: doc.data().nomeFantasia,
                    cnpj: doc.data().cnpj,
                    endereco: doc.data().endereco
                    // created: doc.data().created,
                    // createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                })
            })
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

            setClientes(clientes => [...clientes, ...lista])
            console.log(clientes)

            setLastDocs(lastDoc)
        }
        else {
            setIsEmpty(true)
        }
        setLoadingMore(false)
    }


    async function handleMore() {
        setLoadingMore(true)

        const clientesFiltrados = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5))

        const querySnapshot = await getDocs(clientesFiltrados)
        await updateState(querySnapshot)
    }
    function toggleModal(item) {
        setShowPostModal(!showPostModal)
        setDetail(item)
    }

    if (loading) {
        return (
            <div>
                <Header />

                <div className='content'>
                    <Title name="Tickets">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className='container dashboard'>
                        <span>buscando clientes...</span>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Cliente">
                    <FiMessageSquare size={25} />
                </Title>

                <>


                    {clientes.length === 0 ? (
                        <div className='container dashboard'>
                            <span>nenhum cliente encontrado...</span>
                            <Link to="/clientes-detalhe" className='new'>
                                <FiPlus color='#fff' size={25} />
                                Novo Cliente
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/clientes-detalhe" className='new'>
                                <FiPlus color='#fff' size={25} />
                                Novo Cliente
                            </Link>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nome Fantasia</th>
                                        <th scope='col'>Endereço</th>
                                        <th scope='col'>cnpj</th>

                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td data-label='nomeFantasia'>{item.nomeFantasia}</td>
                                                <td data-label='endereco'>{item.endereco}</td>
                                                <td data-label='cnpj'>{item.cnpj}</td>

                                                {/* <td data-label='Cadastrado'>{item.createdFormat}</td>
                                                <td data-label='Cadastrado'>
                                                    <button className='action'
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        onClick={() => toggleModal(item)}>
                                                        <FiSearch color='#fff' size={17} />
                                                    </button>
                                                    <Link to={`/clientes-detalhe/${item.id}`} className='action' style={{ backgroundColor: '#f6a935' }}>
                                                        <FiEdit2 color='#fff' size={17} />
                                                    </Link>

                                                </td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {loading && <h3>Buscando mais chamados...</h3>}

                            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais </button>}
                        </>


                    )}

                </>
            </div>
            {showPostModal && <Modal conteudo={detail}
                close={() => setShowPostModal(!showPostModal)} />}
        </div>
    )
}