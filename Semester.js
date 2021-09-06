class Semester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderClasses() {
    return this.props.disciplines ? this.props.disciplines.map((data, index) => {
      return (
        <Class
          removeFn={(classData) => { if (this.props.removeClassFn) this.props.removeClassFn(classData) }}
          key={'semester-class-index' + index}
          class={data}
        />
      )
    }) : null;
  }

  getCH() {
    return this.props.disciplines ? this.props.disciplines.map(data => parseInt(data.ch||0)).reduce((a, b) => a + b, 0) : 0;
  }

  render() {

    return (
      <div style={{ border: '1px solid ' + (this.props.selected ? 'red' : 'black') }} className='semester-box'>
        <button className="removeSemesterButton" onClick={() => { this.props.removeThis() }}>X</button>
        <p>{this.props.semester ?? null}º Período</p>
        <div className="classesRenderContainer">
          {this.renderClasses()}
        </div>
        <div className="semester-info">
          CH do periodo: {this.getCH()}
          <br />
          Qtd. de disciplinas: {this.props.disciplines.length}
        </div>
      </div>
    )
  }


}