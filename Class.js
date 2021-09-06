class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (!this.props.class) return null;
    return (
      <div className="class-container" style={{cursor: (this.props.removeFn ? 'unset' : 'pointer')}}>
        <p>{this.props.class.code} - {this.props.class.name}  CH: {this.props.class.ch} {this.props.class.type}</p>
        {this.props.removeFn ? <button onClick={()=>{this.props.removeFn(this.props.class)}}>X</button> : null}
      </div>
    )
  }


}