import React from 'react';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg'
import { COMMENT_POST } from '../../api'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments, single }) => {
    const [comment, setComment] = React.useState("")
    const { request, error, loading } = useFetch()

    async function handleSubmit(event) {
        event.preventDefault()
        const { url, options } = COMMENT_POST(id, { comment })
        const { response, json } = await request(url, options)
        if (response.ok) {
            setComment("")
            setComments((comments) => [...comments, json])
        }
    }

    return (
        <form className={`${styles.form} ${single ? styles.single : ""}`} onSubmit={handleSubmit}>
            <textarea
                className={styles.textarea}
                id="comment"
                name="comment"
                placeholder="Comente..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}

            />
            {loading ? <button disabled className={styles.button}><Enviar /></button> : <button className={styles.button}><Enviar /></button>}
            
            <Error error={error} />
        </form>
    );
}

export default PhotoCommentsForm;
