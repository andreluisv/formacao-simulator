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
            newClass: {
                code: '',
                name: '',
                type: 'OBRIG',
                ch: 0,
                credits: 0,
            }
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
                    <button onClick={() => { this.addNewSemester() }}>Novo periodo</button>
                    <button onClick={() => { this.removeSemester(this.state.selected_semester) }}>Remover Periodo selecionado</button>
                    <div className='semesters-container'>
                        {this.renderSemesters()}
                    </div>
                </div>
                <div>
                    <div>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            const arrDisciplines = [...this.state.disciplines];
                            const Class = this.state.newClass;
                            arrDisciplines.push({ "code": Class.code, "name": this.state.newClass.name, "type": Class.type, "ch": Class.ch, "credits": Class.credits, "score": -1 });
                            this.setState({ disciplines: arrDisciplines });
                        }}>
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
                            <button className="form-field" type="submit">Adicionar</button>
                        </form>
                    </div>
                    <div className='classes-container'>
                        {this.renderDisciplines()}
                    </div>
                </div>
            </>
        )
    }

}