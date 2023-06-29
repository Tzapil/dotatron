import { connect } from 'react-redux';
import { fetchHeroes, fetchHeroById } from '../../reducers/dota';

import './index.css';
import { useEffect } from 'react';

function Dota(reduxProps: any) {
  console.log('RENDER CALL', reduxProps);

  useEffect(() => {
    reduxProps.fetchHeroes();
    reduxProps.fetchHero(1);
  }, []);

  const heroes = reduxProps.dota.heroes;

  return (
    <div className="Dota">
      <div className="Heroes">
        {heroes.map((hero: any) =>
          <div className="Hero">
            <div className="Hero-id">
              {hero.id}
            </div>
            <div className="Hero-name">
              {hero.name}
            </div>
          </div>
        )}
      </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Dota);
