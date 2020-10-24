import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../api'
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

function LoginPasswordReset() {

    const [login, setLogin] = React.useState()
    const [key, setKey] = React.useState()
    const password = useForm()
    const { error, loading, request } = useFetch()
    const navigate = useNavigate()

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const key = params.get("key")
        const login = params.get("login")
        if (key) setKey(key)
        if (login) setLogin(login)

    }, []);

    async function handleSubmit(event) {
        event.preventDefault()
        if (password.validation()) {
            const { url, options } = PASSWORD_RESET({
                login,
                key,
                password: password.value
            })

            const { response } = await request(url, options)
            if (response.ok) navigate("/login")
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Resetar a senha" />
            <h1 className="title">Resete a senha</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Nova Senha" type="password" name="password" {...password}/>

                {loading ? <Button disabled>Resetando...</Button> : <Button>Resetar</Button>}
            </form>

            <Error error={error} />
        </section>
    )
}

export default LoginPasswordReset
