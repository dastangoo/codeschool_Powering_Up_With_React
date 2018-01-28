class CommenbBox extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showComments: false
    };
  }
  
  render() {
    const comments = this._getComments();
    let buttonTex = 'Show Comments';
    
    // Switch button text based on current state
    if (this.state.showComments) {
      buttonTex = 'Hide Comments';
      <div className="comment-list">{comments}</div>
    }
    return (
      <div className="comment-box">
        <h4 className="h4">{this._getCommentsTitle(comments.length)}</h4>
        {commentNotes}
      </div>
      
      // Renders button according text
      <button onClick={this._handleClick.bind(this)}>{buttonTex}</button>
    );
  }
  
  
  _getComments(len) {
    
  }

}