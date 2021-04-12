import Comment from './Comment';
import styles from './Post.module.css';

function Post({ id, title, body, requestComments, comments }) {
  function showComments(e) {
    requestComments(id);
    e.currentTarget.setAttribute("disabled", true);
  }

  return (
    <div>
      <div className={styles.post}>
        <h4 className={styles.title}>{title}</h4>
        <hr className={styles.line}/>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={showComments}>Show comments</button>
      </div>
      {
        comments
        ?
        <div className={styles.comments}>
          {comments.map(c => <div className={styles.comment} key={c.id}><Comment name={c.name} email={c.email} body={c.body}/></div>)}
        </div>
        : <></>
      }
    </div>
  )
}

export default Post;