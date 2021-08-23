class SearchAndAddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div style={{ display: 'flex' }}>
        <input
          onChange={this.props.onChange}
          value={this.props.disciplines_filter}
          id="disciplines_filter-field"
          type="text"
          placeholder="Filtre por Título"
          name="disciplines_filter"
        />
      <button onClick={this.props.toggleFormView}>\/</button>
      </div>
    )
  }


}