class Semester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderClasses() {
    return this.props.disciplines ? this.props.disciplines.map((data, index) => {
      return (
        <Class key={'semester-class-index' + index} class={data} />
      )
    }) : null;
  }

  render() {

    return (
      <div style={{ border: '1px solid ' + (this.props.selected ? 'red' : 'black') }}>
        <p>{this.props.semester ?? null}º Período</p>
        <div>
          {this.renderClasses()}
        </div>
      </div>
    )
  }


}