import React from 'react'
import UserHeader from './UserHeader'
import { Routes, Route } from 'react-router-dom'
import Feed from '../Feed/Feed'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { UserContext } from '../../UserContext'
import NotFound from '../NotFound'
import Head from '../Helper/Head'

function User() {
    const { dados } = React.useContext(UserContext);

    return (
        <section className="container">
            <Head title="Minha Conta" />

            <UserHeader />
            <Routes>
                <Route path="/" element={<Feed user={dados.id} />} />
                <Route path="postar" element={<UserPhotoPost />} />
                <Route path="estatisticas" element={<UserStats />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </section>
    )
}

export default User
