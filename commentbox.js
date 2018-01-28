class CommentBox extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showComments: false,
      // comments is now part of the state
      
      // Hard-coded data
      // comments: [
      //   { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
      //   { id: 2, author: "Bending Bender", body: "Excellent stuff"}
      // ];
      comments: []; /* Initialized to an empty array */
    }
  } // Constructor
  
  componentWillMount() {
    _fetchComments(); /* Fetch comments from server before component is rendered */
  } // componentWillMount
  
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
  } // render
  
  componentDidMount() {
    // Polling the server every five secodns
    // Store time as object property
    this._timer = setInterval(() => this._fetchComments(), 5000);
  } // componentDidMount
  
  componenWillUnmount(){
    clearInterval(this._timer);
  } // componentWillMount
  
  _getComments(){
    // const commentList [
    //   { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
    //   { id: 2, author: "Bending Bender", body: "Excellent stuff"}
    // ];
    
    // Reading from component's state
    return this.state.comments.map((comment) => {
      // return (<Comment author={comment.author} body={comment.body} key={comment.id} />);
      return (<Comment comment={comment} 
                       key={comment.id} 
                       onDelete={this._deleteComments.bind(this)}/>); // Will later be called in the context of the CommentBox component
    });
  } // _getComments
  
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  } // _getCommentsTitle
  
  _addComment(author, body) {
      // Gets triggered by CommentForm when a new comment is added.
      // const comment = {
      //   id: this.state.comments.length + 1,
      //   author, 
      //   body
      // };
      const comment = { author, body };
      
      // Updates state when function is called by adding new comment
      // this.setState({ comments: this.state.comments.concat([comment])}) /* New array references help React stary fast. So concat works better than push here */

      jQuery.post('/api/comments', { comment })
            .success(newComment => {
              // State is only updated when we get the new comment from the API request
              this.setState({ comments: this.state.comments.concat([newComment])}) 
            });
  } // _addComment
  
  // We can't call _fetchComments from render - we'll get an infinite loop
  // _fetchComments calls setState, which calls render
  _fetchComments() {
    jQuery.ajax({
      method: 'GET',
      url: '/api/comments/', /* Makes call to the remote server */
      success: (comments) => { /* Arrow function preserves the this binding to our classs */
        this.setState({ comments })
      }
    });
  } // _fetchComments
  
  _deleteComments(comment) {
    
    // You can use jQuery or $ reference in jQuery library
    $.ajax({
      method: 'DELETE',
      url: `/api/comments/${comment.id}`
    });
    
    // Use spread operator to clone existing array
    const comments = [...this.state.comments];
    const commentIndex = comments.indexOf(comment);
    // Removes comment from array
    comments.splice(commentIndex, 1);
    
    // Updates state with modified comments array
    this.setState({ comments });
  } // _deleteComments
} // CommentBox