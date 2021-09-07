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
            showNewClassInputForm: false,
        }
    }

    fetchDisciplines() {
        this.setState({ disciplines: classesJson });
    }

    componentDidMount() {
        if (this.fetchSavedState()) return;
        this.fetchDisciplines();
    }

    fetchSavedState() {
        const state = localStorage.getItem('formacao-simulator-state');
        if (!state) return false;
        this.setState(JSON.parse(state));
        return true;
    }

    saveCurrentState() {
        localStorage.setItem('formacao-simulator-state', JSON.stringify(this.state))
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
                <div key={'disciplines-field' + index} >
                    <Class class={data} index={index} addDiscipline={(i) => { this.addDisciplineToSemester(i) }} />
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
        this.setState({ semesters: arr, selected_semester: arr.length - 1 });
    }

    removeSemester(index) {
        const arrSemester = [...this.state.semesters];
        var arrDisciplines = [...this.state.disciplines];
        if (!(index >= 0 && index < arrSemester.length)) return;
        const removed = arrSemester.splice(index, 1)[0];
        removed.disciplines.map((cl) => {
            arrDisciplines = [cl].concat(arrDisciplines);
        })
        this.setState({ semesters: arrSemester, selected_semester: -1, disciplines: arrDisciplines });
        this.updateCourseProgession(arrSemester);
    }

    removeClassFromSemester(classData, semesterIndex) {
        const arrSemester = [...this.state.semesters];
        var arrDisciplines = [...this.state.disciplines];
        if (!(semesterIndex >= 0 && semesterIndex < arrSemester.length)) return;

        const idx = arrSemester[semesterIndex].disciplines.findIndex((clss) => clss.code == classData.code && clss.name == classData.name);
        if (idx == -1) return;
        arrDisciplines = [classData].concat(arrDisciplines);
        arrSemester[semesterIndex].disciplines.splice(idx, 1);

        this.setState({ semesters: arrSemester, selected_semester: -1, disciplines: arrDisciplines });
        this.updateCourseProgession(arrSemester);
    }

    addNewDiscipline(classData) {
        const arrDisciplines = [...this.state.disciplines];
        const Class = classData;
        const validator = [Class.code, Class.name, Class.ch, Class.credits, Class.type].map(val => { return val||val===0 ? true : false });
        if (validator.includes(false)) return;
        const adc = { "code": Class.code, "name": Class.name, "type": Class.type, "ch": Class.ch, "credits": Class.credits, "score": -1 };
        this.setState({ disciplines: [adc].concat(arrDisciplines) });
    }

    render() {
        return (
            <div>
                <button className="newSemesterButton" onClick={() => { this.addNewSemester() }}>➕</button>
                <div className="header">
                    <div className="header-logo">
                        <h1>Formação Simulator</h1>
                        <span>By: André Vasconcelos </span>
                        <span className="header-save-btn" onClick={() => {this.saveCurrentState()}}>💾</span>
                    </div>
                    <div className="contact-list">
                        <a href="https://github.com/andreluisv/formacao-simulator" target="_blank">
                            <svg height="42" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="42" data-view-component="true" >
                                <title>Github</title>
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/andrevas86/" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 34 34" >
                                <title>LinkedIn</title>
                                <g><path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" ></path></g>
                            </svg>
                        </a>
                        <a href="mailto:alpvj@cin.upfe.br" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"  viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <title>Mail Me</title>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </a>
                    </div>
                    <ResumoCargaHoraria progession={this.state.course_progression} />
                </div>
                <hr />
                <div className="main">
                    <div className='semesters-container'>
                        {this.renderSemesters()}
                    </div>
                </div>
                <hr />
                <div className="footer">
                    <SearchAndAddBar value={this.state.disciplines_filter} onChange={(event) => { this.setState({ disciplines_filter: (event.target.value||'').toLowerCase() }) }} isToggled={this.state.showNewClassInputForm} toggleFormView={() => { this.setState({ showNewClassInputForm: !this.state.showNewClassInputForm }) }} />
                    {this.state.showNewClassInputForm ? <NewClassInputForm addNewDiscipline={(data) => { this.addNewDiscipline(data) }} /> : null}
                    <div className='classes-container'>
                        {this.renderDisciplines()}
                    </div>
                </div>
            </div>
        )
    }

}