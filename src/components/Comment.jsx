import styles from './Comment.module.css';

function Comment({ name, email, body }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
      </div>
      <hr/>
      <div className={styles.bottom}>
        <p className={styles.body}>{body}</p>
      </div>
    </div>
  )
}

export default Comment;