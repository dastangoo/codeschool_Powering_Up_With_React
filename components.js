class StoryBox extends React.Component {
  render() {
    
    const now = new Date();
    const topicList = ['HTML', 'JavaScript', 'React'];
    
    return (
      <div>
        <h3>Story Box</h3>
        <p className="lead">
          Current time: {now.toTimeString()}
        </p>
        
        <ul>
          {topicList.map( topic => <li>{topic}</li> )}
        </ul>
      </div>
    );
  }
} 


ReactDom.render(
  <StoryBox />, document.getElementById('story-app')
);