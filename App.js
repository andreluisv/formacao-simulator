class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course_progression: [
                { name: 'Obrigatoria', total: 2355, attended: 0 },
                { name: 'Eletiva Do Perfil', total: 750, attended: 0 },
                { name: 'Eletiva Livre', total: 390, attended: 0 }
            ],
            selected_semester: -1,
            semesters: [],
            disciplines: [],
        }
    }

    fetchDisciplines() {
        this.setState({ disciplines: classesJson });
    }

    componentDidMount() {
        this.fetchDisciplines();
    }

    updateCourseProgession(inputArr) {
        let obrig = 0;
        let eleti = 0;
        let eletiLivre = 0;
        let arr = [...inputArr];
        if (!arr) arr = [...this.state.semesters];

        arr.map((sem) => {
            sem.disciplines.map((data) => {
                if (data.type == 'OBRIG') obrig += data.ch;
                else if (data.type == 'ELETI') eleti += data.ch;
                else if (data.type == 'OUTRO') eletiLivre += data.ch;
            })
        })
        this.setState({
            course_progression: [
                { name: 'Obrigatoria', total: 2355, attended: obrig },
                { name: 'Eletiva Do Perfil', total: 750, attended: eleti },
                { name: 'Eletiva Livre', total: 390, attended: eletiLivre }
            ]
        })
    }

    renderSemesters() {
        return this.state.semesters.map((semester, index) => {
            return (
                <div key={'semester-field' + index} onClick={() => { this.setState({ selected_semester: index }) }}>
                    <Semester selected={index == this.state.selected_semester} semester={index + 1} disciplines={semester.disciplines} />
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
        this.updateCourseProgession(arrSemester);
    }

    addNewSemester() {
        const arr = [...this.state.semesters];
        arr.push({ disciplines: [] });
        this.setState({ semesters: arr });
    }

    removeSemester(index) {
        const arrSemester = [...this.state.semesters];
        const arrDisciplines = [...this.state.disciplines];
        if (!(index >= 0 && index < arrSemester.length)) return;
        const removed = arrSemester.splice(index, 1)[0];
        removed.disciplines.map((cl) => {
            arrDisciplines.push(cl);
        })
        this.setState({ semesters: arrSemester, selected_semester: -1, disciplines: arrDisciplines });
        this.updateCourseProgession(arrSemester);
    }

    render() {
        return (
            <>
                <ResumoCargaHoraria progession={this.state.course_progression} />
                <div>
                    <button onClick={() => { this.addNewSemester() }}>New+</button>
                    <button onClick={() => { this.removeSemester(this.state.selected_semester) }}>Remove Selected</button>
                    {this.renderSemesters()}
                </div>
                <div>
                    {this.renderDisciplines()}
                </div>
            </>
        )
    }

}