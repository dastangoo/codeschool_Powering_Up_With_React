class CommentBox extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showComments: false,
      // comments is now part of the state
      comments: [
        { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
        { id: 2, author: "Bending Bender", body: "Excellent stuff"}
      ];
    }
  }
  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        {/* <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div> */}
        {/* Using the newly created CommentForm component and passing it a callback prop*/}
        <CommentForm addComment={this._addComment.bind(this)} />
      </div>
    );
  }
  
  _getComments(){
    // const commentList [
    //   { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
    //   { id: 2, author: "Bending Bender", body: "Excellent stuff"}
    // ];
    
    // Reading from component's state
    return this.state.comments.map((comment) => {
      return (<Comment author={comment.author} body={comment.body} key={comment.id} />);
    });
  }
  
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
  
  _addComment(author, body) {
      // Gets triggered by CommentForm when a new comment is added.
      const comment = {
        id: this.state.comments.length + 1,
        author, 
        body
      };
      
      // Updates state when function is called by adding new comment
      this.setState({ comments: this.state.comments.concat([comment])}) /* New array references help React stary fast. So concat works better than push here */
      
  }
}