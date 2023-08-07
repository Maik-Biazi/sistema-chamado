import Title from "../../components/Title";
import Header from "../../components/header";
import { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, } from 'firebase/firestore'
import { toast } from 'react-toastify'


export default function Customers() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')
    const [loading, setLoaging] = useState(false)

    async function handlerRegister(e) {
        setLoaging(true)
        e.preventDefault();
        if (nome.trim() === '' || cnpj.trim() === '' || endereco.trim() === '') {
            toast.info('os campos nao foram preenchido')
            setLoaging(false)
        }

        if (nome !== '' && cnpj !== '' && endereco !== '') {
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            }).then(() => {

                setNome('')
                setCnpj('')
                setEndereco('')
                toast.success('empresa registrada!')
                setLoaging(false)
            }).catch((error) => {
                console.log(error)
                toast.error('Ops!! algo deu errado')
                setLoaging(false)
            })


        }
    }


    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Clientes">
                    <FiUser />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Nome Fantasia</label>
                        <input type="text"
                            placeholder="Nome da Empresa"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <label>Cnpj</label>
                        <input type="text"
                            placeholder="cpnj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit" onClick={handlerRegister}>
                            {loading ? 'Carregando...' : 'Salvar'}</button>

                    </form>

                </div>
            </div>

        </div>
    )

}