import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForms from './PhotoCommentsForm'
import styles from './PhotoComments.module.css'

const PhotoComments = (props) => {
    const [comments, setComments] = React.useState(() => props.comments)
    const commentsSection = React.useRef(null)
    const { login } = React.useContext(UserContext)

    React.useEffect(() => {
        commentsSection.current.scrollTop = commentsSection.current.scrollHeight
    })

    return (
        <>
            <ul ref={commentsSection} className={`${styles.comments} ${props.single ? styles.single : ""}`}>
                {comments.map((comment) => (
                    <li key={comment.comment_ID}>
                        <b>{comment.comment_author}</b>
                        <span>{comment.comment_content}</span>
                    </li>
                ))}
            </ul>
            {login && <PhotoCommentsForms single={props.single} id={props.id} setComments={setComments}/>}
        </>

    );
}

export default PhotoComments;
