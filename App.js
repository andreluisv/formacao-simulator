class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Andre',
            course_progression: [],
            selected_semester: -1,
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
                <div key={'semester-field' + index} onClick={() => { this.setState({ selected_semester: index }) }}>
                    <Semester selected={index == this.state.selected_semester} semester={index + 1} disciplines={semester.disciplines} />
                    <button onClick={() => { this.removeSemester(index) }}>Trash</button>
                </div>
            )
        })
    }

    renderDisciplines() {
        return this.state.disciplines.map((data, index) => {
            return (
                <div key={'disciplines-field' + index} onClick={() => { this.addDisciplineToSemester(index) }}>
                    <Class class={data} />
                </div>
            )
        })
    }

    addDisciplineToSemester(index) {
        const arrSemester = [...this.state.semesters];
        const arrDisciplines = [...this.state.disciplines];
        if (!(this.state.selected_semester >= 0 && this.state.selected_semester < arrSemester.length)) return;
        arrSemester[this.state.selected_semester].disciplines.push(arrDisciplines[index]);
        arrDisciplines.splice(index, 1);
        this.setState({ semesters: arrSemester, disciplines: arrDisciplines });
    }

    addNewSemester() {
        const arr = [...this.state.semesters];
        arr.push({ disciplines: [] });
        this.setState({ semesters: arr });
    }

    removeSemester(index) {
        const arr = [...this.state.semesters];
        arr.splice(index, 1);
        this.setState({ semesters: arr, selected_semester: -1 });
    }

    render() {
        return (
            <>
                <h2>Hello {this.state.name || 'Friend'}! Welcome Back!</h2>
                <ResumoCargaHoraria progession={this.state.course_progression} />
                <div>
                    <button onClick={() => { this.addNewSemester() }}>New+</button>
                    {this.renderSemesters()}
                </div>
                <div>
                    {this.renderDisciplines()}
                </div>
            </>
        )
    }

}