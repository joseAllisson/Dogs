import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from '../User/UserHeader.module.css'
import { useLocation } from 'react-router-dom'


function UserHeader() {

    const [title, setTitle] = React.useState("")
    const location = useLocation()


    React.useEffect(() => {
        if(location.pathname === "/conta") setTitle("Conta")
        if(location.pathname === "/conta/postar") setTitle("Postar")
        if(location.pathname === "/conta/estatisticas") setTitle("Estatísticas")
    }, [location])

    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader
