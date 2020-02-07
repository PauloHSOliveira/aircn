import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');//utilizar o estado do input, o valor se atualiza

    async function handleSubmit(event) {
        event.preventDefault();//para não enviar á proxima pagina

        const response = await api.post('/sessions', { email });//enviar valor pra api

        const { _id } = response.data; //pegar o id do user

        localStorage.setItem('user', _id); //salvar o id do user no navegador

        history.push('/dashboard')
    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}