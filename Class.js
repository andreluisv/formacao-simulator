class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    if (!this.props.class) return null;
    return (
      <div className="class-box">
        <div className="class-box-top">
          <span>{this.props.class.code}</span>
          <div className="class-box-top-right">
            <span> {this.props.class.ch} </span>
            <span> {this.props.class.type} </span>
            {this.props.removeFn ? 
              <button className="removeClassButton" onClick={() => { this.props.removeFn(this.props.class) }}>X</button> 
              :
              <button className="addClassButton" onClick={() => { this.props.addDiscipline(this.props.index) }}>+</button> 
            }
            
          </div>
        </div>
        <span>{this.props.class.name}</span>
      </div>
    )
  }


}