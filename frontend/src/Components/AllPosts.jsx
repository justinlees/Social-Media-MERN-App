export default function AllPosts() {
  return (
    <div className="allPosts">
      <section className="card">
        <div className="cardHeader">
          <div className="cardUser">
            <img />
            <p>UserName</p>
          </div>
          <span>::</span>
        </div>
        <div className="cardPost">
          <img src="https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/07/Pictures/fbl-esp-liga-barcelona-real-madrid_e11c3a40-51c4-11e8-aa60-d0af28d4422a.jpg" />
        </div>
        <div className="postCaption">
          <div className="cardReview">
            <p>
              <span className="material-symbols-outlined">
                sentiment_satisfied
              </span>
              1,578
            </p>
            <p>
              <span className="material-symbols-outlined">mode_comment</span>325
            </p>
            <p>
              <span className="material-symbols-outlined">send</span>
            </p>
          </div>
          <p className="caption">
            <span>UserName</span>
            The Caption for the image... readMore
          </p>
        </div>
      </section>
    </div>
  );
}
