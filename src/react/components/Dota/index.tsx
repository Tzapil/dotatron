import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchHeroesThunk,
  fetchHeroesStatsThunk,
  fetchHeroItemsByIdThunk,
  fetchHeroMatchupsByIdThunk,
  fetchHeroBenchmarksByIdThunk,
  fetchHeroItemsTimingsByIdThunk
} from '../../reducers/dota';
import { baseURL, MOST_POPULAR_ITEMS_AMOUNT, HIGHEST_WINRATE_ITEMS_AMOUNT } from '../../const';

import './index.css';

const juggernautID = 8;

function Dota(reduxProps: any) {
  console.log('RENDER CALL', reduxProps);

  useEffect(() => {
    // reduxProps.fetchHeroes();
    // reduxProps.fetchHero(juggernautID);
    reduxProps.fetchData(juggernautID);
  }, []);

  const heroes = reduxProps.dota.heroes;
  const heroes_stats = reduxProps.dota.heroes_stats;

  let timings = [...reduxProps.dota.items_timings];
  timings.sort((a, b) => a.time - b.time);
  // timings.sort((a, b) => b.games - a.games);
  // timings = timings.slice(0, MOST_POPULAR_ITEMS_AMOUNT);
  // timings.sort((a, b) => b.winrate - a.winrate);
  // timings = timings.slice(0, HIGHEST_WINRATE_ITEMS_AMOUNT);
  console.log('TIMINGS');
  console.log(timings);

  return (
    <div className="Dota">
      {/* <div>
        {JSON.stringify(timings, null, 3)}
      </div> */}
      <div className="Heroes">
        <h3 className="Hero-title"> Heroes: </h3>
        {heroes_stats.map((hero: any) =>
          <div className="Hero" key={hero.name}>
            <div className="Hero-icon">
              <img src={baseURL + hero.icon} />
            </div>
            <div className="Hero-name">
              {hero.localized_name}
            </div>
            <div className="Hero-roles">
              {hero.roles.map((role: any) =>
                <div className="Hero-role">
                  {role}
                </div>
              )}
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
  // fetchHero: (id: number) => dispatch(fetchHeroItemsByIdThunk(id)),
  // fetchHeroes: () => dispatch(fetchHeroesThunk()),
  fetchData: (id: number) => {
    // dispatch(fetchHeroesThunk());
    // dispatch(fetchHeroesStatsThunk());
    // dispatch(fetchHeroItemsByIdThunk(id));
    // dispatch(fetchHeroItemsTimingsByIdThunk(id));
    // dispatch(fetchHeroBenchmarksByIdThunk(id));
    // dispatch(fetchHeroMatchupsByIdThunk(id));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dota);
