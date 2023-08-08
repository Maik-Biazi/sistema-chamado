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

            </div>
        </div>
    )
}