export default function Post({ posts }) {
  return (
    <>
      {posts?.map((post) => (
        <section className="card" key={post?._id}>
          <div className="cardHeader">
            <div className="cardUser">
              <img />
              <p>{post?.userName}</p>
            </div>
            <span>::</span>
          </div>
          <div className="cardPost">
            <img src="https://static.skillshare.com/uploads/discussion/tmp/cbe48544.jpg" />
          </div>
          <div className="postCaption">
            <div className="cardReview">
              <p>
                <span className="material-symbols-outlined">
                  sentiment_satisfied
                </span>
                {post?.likes}
              </p>
              <p>
                <span className="material-symbols-outlined">mode_comment</span>
                {post?.comments}
              </p>
              <p>
                <span className="material-symbols-outlined">send</span>
              </p>
            </div>
            <p className="caption">
              <span>{post?.userName}</span>
              {post?.postCaption}
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
