class NewClassInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newClass: {
        code: '',
        name: '',
        type: 'OBRIG',
        ch: undefined,
        credits: undefined,
      }
    }
  }

  render() {
    if (!this.props.addNewDiscipline) return null;
    return (
      <div className="newClassInputForm">
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.addNewDiscipline(this.state.newClass);
        }}>
          <div>
            <input
              onChange={(event) => {
                const newClass = { ...this.state.newClass };
                newClass.code = event.target.value;
                this.setState({ newClass: newClass })
              }}
              value={this.state.newClass.code}
              id="code-field"
              type="text"
              placeholder="Código"
              name="code"
            />
            <input
              onChange={(event) => {
                const newClass = { ...this.state.newClass };
                newClass.name = event.target.value;
                this.setState({ newClass: newClass })
              }}
              value={this.state.newClass.name}
              id="name-field"
              type="text"
              placeholder="Título"
              name="name"
            />
            <input
              onChange={(event) => {
                const newClass = { ...this.state.newClass };
                newClass.ch = event.target.value;
                this.setState({ newClass: newClass })
              }}
              value={this.state.newClass.ch}
              id="ch-field"
              type="number"
              placeholder="Carga Horária"
              name="ch"
            />
            <input
              onChange={(event) => {
                const newClass = { ...this.state.newClass };
                newClass.credits = event.target.value;
                this.setState({ newClass: newClass })
              }}
              value={this.state.newClass.credits}
              id="credits-field"
              type="number"
              placeholder="Créditos"
              name="credits"
            />
            <select value={this.state.newClass.type} onChange={(event) => {
              const newClass = { ...this.state.newClass };
              newClass.type = event.target.value;
              this.setState({ newClass: newClass })
            }}>
              <option value="OBRIG">Obrigatoria</option>
              <option value="ELETI">Eletiva De Perfil</option>
              <option value="OUTRO">Eletiva Livre</option>
            </select>
          </div>
          <div>
            <button className="form-field mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">+</button>
          </div>
        </form>
      </div>
    )
  }


}