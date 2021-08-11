class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (!this.props.class) return null;
    return (
      <div>
        <p>{this.props.class.code} - {this.props.class.name}  CH: {this.props.class.ch} {this.props.class.type}</p>
      </div>
    )
  }


}