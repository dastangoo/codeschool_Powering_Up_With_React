class Comment extends React.Component {
  render(){
      return (
        <div className="comment">
          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">
            {this.props.body}
          </p>
          <div className="comment-footer">
            {/* When a user clicks on the link, the onClick event is emitted */}
            <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}> 
              Delete comment
            </a>
          </div>
        </div>
      );
  } // render
  
  _handleDelete(event) {
    event.preventDefault();
    if (confirm('Are you sure?')) {
      // Show cofirmaiton box before deleting
      this.props.onDelete(this.props.comments); // Call onDelete prop when button is clicked
    }
  } // _handleDelete
}