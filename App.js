class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          name: 'Andre',
      }
  }

  render(){
      return(
          <>
              <h2>Hello {this.state.name || 'Friend'}! Welcome Back.</h2>
          </>
      )
  }

}