import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.css';
import Post from './components/Post';
import { getPostComments, getPosts, getFetchingStatus } from './redux/selectors/postSelectors';
import { requestComments } from './redux/reducers/postReducer';
import { isInizialized } from './redux/selectors/appSelector';
import { initializeApp } from './redux/reducers/appReducer';

function App({ posts, requestComments, comments, isFetching }) {
  function showMore() {
    setPageSize(pageSize + 1);
  }

  const [pageSize, setPageSize] = useState(1)

  const postsToShow = posts.filter((p, i) => i < pageSize).map(p => 
      <div key={p.id} className={styles.post}>
        <Post id={p.id} title={p.title} body={p.body} requestComments={requestComments} 
          comments={comments.filter(c => c.postId === p.id)} isFetching={isFetching}/>
      </div>
    )

  return (
    <div className={styles.wrapper}>
      {postsToShow}
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={showMore} disabled={pageSize >= posts.length ? true : false}>
          Show more
        </button>
      </div>
    </div>
  )
}

function AppContainer({ initializeApp, initialized, ...props }) {
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  if (!initialized) {
    return (
      <div className={styles.preloaderWrapper}>
        <h1 className={styles.preloader}>
          Loading page...
        </h1>
      </div>
    )
  } 
  return <App {...props}/> 
}

export default connect(function(state) {
  return {
    posts: getPosts(state),
    comments: getPostComments(state),
    isFetching: getFetchingStatus(state),
    initialized: isInizialized(state)
  }
}, { requestComments, initializeApp })(AppContainer);