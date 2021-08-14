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

  render() {

    return (
      <div style={{ border: '1px solid ' + (this.props.selected ? 'red' : 'black') }} className='semester-box'>
        <p>{this.props.semester ?? null}º Período</p>
        <div>
          {this.renderClasses()}
        </div>
      </div>
    )
  }


}