import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/header';
import './dashboard.css'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to="/new" className='new'>
                        <FiPlus color='#fff' size={25} />
                        Novo chamado
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Assunto</th>
                                <th scope='col'>status</th>
                                <th scope='col'>cadastrado em</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label='Cliente'>Mercado esquina</td>
                                <td data-label='Assunto'>Suporte</td>
                                <td data-label='status'>
                                    <span className='badge' style={{ backgroundColor: '#999' }}>Em aberto</span>
                                </td>
                                <td data-label='Cadastrado'>12/05/2022</td>
                                <td data-label='Cadastrado'>
                                    <button className='action' style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color='#fff' size={17} />
                                    </button>
                                    <button className='action' style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color='#fff' size={17} />
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>

            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}