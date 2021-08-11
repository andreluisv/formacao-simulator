class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Andre',
            course_progression: [],
            semesters: [],
            disciplines: [],
        }
    }

    mockData() {
        this.setState({ course_progression: [{ name: 'Obrigatoria', total: 2355, attended: 1755 }, { name: 'Eletiva Do Perfil', total: 750, attended: 0 }, { name: 'Eletiva Livre', total: 390, attended: 75 }] })
        this.setState({ disciplines: [{ code: 'IF669', name: 'INTRODUCAO A PROGRAMACAO', ch: 120, credits: 6, score: 10.0 }] });
        this.setState({ semesters: [{ disciplines: [{ code: 'IF668', name: 'INTRODUCAO A COMPUTACAO', ch: 45, credits: 3, score: 10.0 }, { code: 'IF669', name: 'INTRODUCAO A PROGRAMACAO', ch: 120, credits: 6, score: 10.0 }] }] });
    }

    componentDidMount() {
        this.mockData();
    }

    renderSemesters() {
        return this.state.semesters.map((semester, index) => {
            return (
                <Semester key={'semester-field'+index} semester={index + 1} disciplines={semester.disciplines} />
            )
        })
    }

    render() {
        return (
            <>
                <h2>Hello {this.state.name || 'Friend'}! Welcome Back!</h2>
                <ResumoCargaHoraria progession={this.state.course_progression} />
                <div>
                    {this.renderSemesters()}
                </div>
                <div>
                    <Class class={this.state.disciplines[0]} />
                </div>
            </>
        )
    }

}