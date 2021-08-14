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
            disciplines_filter: '',
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
                const ch = parseInt(data.ch);
                if (data.type == 'OBRIG') obrig += ch;
                else if (data.type == 'ELETI') eleti += ch;
                else if (data.type == 'OUTRO') eletiLivre += ch;
            })
        })

        if (eleti > 750) {
            eletiLivre += eleti - 750;
        }
        this.setState({
            course_progression: [
                { name: 'Obrigatoria', total: 2355, attended: Math.min(obrig, 2355) },
                { name: 'Eletiva Do Perfil', total: 750, attended: Math.min(eleti, 750) },
                { name: 'Eletiva Livre', total: 390, attended: Math.min(eletiLivre, 390) }
            ]
        })
    }

    renderSemesters() {
        return this.state.semesters.map((semester, index) => {
            return (
                <div key={'semester-field' + index} onClick={() => { this.setState({ selected_semester: index }) }}>
                    <Semester
                        removeClassFn={(data) => { this.removeClassFromSemester(data, index) }}
                        removeThis={() => { this.removeSemester(index) }}
                        selected={index == this.state.selected_semester}
                        semester={index + 1} disciplines={semester.disciplines}
                    />
                </div>
            )
        })
    }

    renderDisciplines() {
        return this.state.disciplines.map((data, index) => {
            if (!data.name.toLowerCase().includes(this.state.disciplines_filter)) return null;
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

    removeClassFromSemester(classData, semesterIndex) {
        const arrSemester = [...this.state.semesters];
        const arrDisciplines = [...this.state.disciplines];
        if (!(semesterIndex >= 0 && semesterIndex < arrSemester.length)) return;

        const idx = arrSemester[semesterIndex].disciplines.findIndex((clss) => clss.code == classData.code && clss.name == classData.name);
        if (idx == -1) return;
        arrDisciplines.push(classData);
        arrSemester[semesterIndex].disciplines.splice(idx, 1);

        this.setState({ semesters: arrSemester, selected_semester: -1, disciplines: arrDisciplines });
        this.updateCourseProgession(arrSemester);
    }

    addNewDiscipline(classData) {
        const arrDisciplines = [...this.state.disciplines];
        const Class = classData;
        arrDisciplines.push({ "code": Class.code, "name": Class.name, "type": Class.type, "ch": Class.ch, "credits": Class.credits, "score": -1 });
        this.setState({ disciplines: arrDisciplines });
    }

    render() {
        return (
            <>
                <ResumoCargaHoraria progession={this.state.course_progression} />
                <div>
                    <button onClick={() => { this.addNewSemester() }}>Novo periodo</button>
                    <div className='semesters-container'>
                        {this.renderSemesters()}
                    </div>
                </div>
                <div>
                    <NewClassInputForm addNewDiscipline={(data) => { this.addNewDiscipline(data) }} />
                    <input
                        onChange={(event) => {
                            const title = event.target.value;
                            this.setState({ disciplines_filter: title })
                        }}
                        value={this.state.disciplines_filter}
                        id="disciplines_filter-field"
                        type="text"
                        placeholder="Filtre por Título"
                        name="disciplines_filter"
                    />
                    <div className='classes-container'>
                        {this.renderDisciplines()}
                    </div>
                </div>
            </>
        )
    }

}