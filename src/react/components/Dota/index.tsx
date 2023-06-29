import { connect } from 'react-redux';
import './index.css';

function App(reduxProps: any) {
  console.log('RENDER CALL', reduxProps);
  return (
    <div className="App">
      <header className="App-header">
        <img src={'lol'} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  dota: state.dota
});

export default connect(mapStateToProps)(App);
