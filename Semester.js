class Semester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderClasses() {
    return this.props.disciplines ? this.props.disciplines.map((data, index) => {
      return (
        <div key={'semester-class-index'+index}>
          <Class class={data}/>
        </div>
      )
    }) : null;
  }

  render() {

    return (
      <div style={{border:'1px solid black'}}>
        <p>{this.props.semester??null}ºª Período</p>
        <div>
          {this.renderClasses()}
        </div>
      </div>
    )
  }


}