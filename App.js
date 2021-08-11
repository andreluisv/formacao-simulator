class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Andre',
            course_progression: [],
            semester: [],
            disciplines: [],
        }
    }

    mockData() {
        this.setState({ course_progression: [{ name: 'Obrigatoria', total: 2355, attended: 1755 }, { name: 'Eletiva Do Perfil', total: 750, attended: 0 }, { name: 'Eletiva Livre', total: 390, attended: 75 }] })
    }

    componentDidMount() {
        this.mockData();
    }

    render() {
        return (
            <>
                <h2>Hello {this.state.name || 'Friend'}! Welcome Back!</h2>
                <ResumoCargaHoraria progession={this.state.course_progression} />
            </>
        )
    }

}