class CommentForm extends React.Component {
  render() {
    return (
      // JSX markup for CommentForm
      
      // Adds an event listner to the submit event
      // Don't forget to bind event handlers, otherwise this will not work!
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          {/* DOM element passed into callback */}
          {/* We'll use these refs to access values from the input elements in event handler */}
          <input placeholder="Name:" ref={(input) => this._author = input}/>
          {/* Below is as same as above */}
          <input placeholder="Name:" ref={
            function (input) {
              this._author = input
            }.bind(this) /* this refers to CommentForm */
          }/>
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
           <button type="submit">
             Post comment
           </button>
        </div>
      </form>
    );
  }
  
  _handleSubmit(event) {
    // Prevents page from reloading
    event.preventDefault();
    
    // Populated from refs in JSX
    let author = this._author
    let body = this._body
    
    // This method has been passed as an argument
     this.props.addComment(author.value, body.value)
  }
}