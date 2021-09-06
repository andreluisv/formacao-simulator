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
    return this.props.disciplines ? this.props.disciplines.map(data => data.ch).reduce((a, b) => a + b, 0) :0;
  }

  render() {

    return (
      <div style={{ position: 'relative', border: '1px solid ' + (this.props.selected ? 'red' : 'black') }} className='semester-box'>
        <p>{this.props.semester ?? null}º Período</p>
        <button style={{position: 'absolute', top:'0',right:'0'}} onClick={() => { this.props.removeThis() }}>X</button>
        <div className="classesRenderContainer">
          {this.renderClasses()}
        </div>
        <div style={{margin: '0 0 0 0'}}>
          CH do periodo: {this.getCH()}
          <br/>
          Qtd. de disciplinas: {this.props.disciplines.length}
        </div>
      </div>
    )
  }


}