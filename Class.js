class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (!this.props.class) return null;
    return (
      <div style={{display: 'flex'}}>
        <p>{this.props.class.code} - {this.props.class.name}  CH: {this.props.class.ch} {this.props.class.type}</p>
        {this.props.removeFn ? <button onClick={()=>{this.props.removeFn(this.props.class)}}>Del</button> : null}
      </div>
    )
  }


}