class ResumoCargaHoraria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderTableData() {
    return this.props.progession ? this.props.progession.map((prog, index) => {
      const { name, total, attended } = prog
      return (
        <tr key={'resumo-carga-horaria-row' + name}>
          <td>{name}</td>
          <td>{total}</td>
          <td>{attended}</td>
          <td>{(Math.round(attended / total * 10000) / 100 + '%')}</td>
        </tr>
      )
    }) : null;
  }

  render() {

    return (
      <div className="resumo-carga-horaria-container">
        <table id='resumo-carga-horaria' className="tableCH">
          <tbody>
            <tr>
              <td>Nome</td>
              <td>Integralização</td>
              <td>Cursada</td>
              <td>%</td>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }


}