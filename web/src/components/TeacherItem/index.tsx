import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/26015954?s=460&u=af11d95f3693c258dc23088a35408b4f223424b5&v=4" alt="Renan Viana"/>
                <div>
                    <strong>Renan Viana</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
                Entusiasta das melhores tecnologias de Química avançada.
                <br/><br/>
                Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências.
            </p>

            <footer>
                <p>
                    Preço/hora 
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem