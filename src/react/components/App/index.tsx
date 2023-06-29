import { connect } from 'react-redux';
import { fetchHeroes, fetchHeroById } from '../../reducers/dota';

import Dota from '../Dota';

import './index.css';
import { useEffect } from 'react';

function App(reduxProps: any) {
  console.log('RENDER CALL', reduxProps);

  // useEffect(() => {
  //   reduxProps.fetchHeroes();
  //   reduxProps.fetchHero(1);
  // }, []);

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
      <Dota />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  dota: state.dota
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchHero: (id: number) => dispatch(fetchHeroById(id)),
  fetchHeroes: () => dispatch(fetchHeroes()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
