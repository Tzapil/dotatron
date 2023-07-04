import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

function Heroes(reduxProps: any) {
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
    <div className="HeroList">
        <h3 className="HeroList-title"> Heroes: </h3>
        {heroes_stats.map((hero: any) =>
            <Link className="HeroList-item" key={hero.name} to={`/hero/${hero.id}`}>
                <div className="HeroList-item-icon">
                    <img src={baseURL + hero.icon} />
                </div>
                <div className="HeroList-item-name">
                    {hero.localized_name}
                </div>
                <div className="HeroList-item-roles">
                    {hero.roles.map((role: any) =>
                        <div className="HeroList-item-role">
                            {role}
                        </div>
                    )}
                </div>
            </Link>
        )}
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


export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
