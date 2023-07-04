import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchHeroesThunk,
  fetchHeroesStatsThunk,
  fetchHeroItemsByIdThunk,
  fetchHeroMatchupsByIdThunk,
  fetchHeroBenchmarksByIdThunk,
  fetchHeroItemsTimingsByIdThunk
} from '../../reducers/dota';
import { baseURL, MOST_POPULAR_ITEMS_AMOUNT, HIGHEST_WINRATE_ITEMS_AMOUNT } from '../../const';
import { findHero } from '../../utils';
import Matchups from '../Matchups';

import './index.css';

function Hero(reduxProps: any) {
    const { id: heroId } = useParams();
    console.log('HERO ROUTER CALL', heroId, reduxProps);

    // useEffect(() => {
    // // reduxProps.fetchHeroes();
    // // reduxProps.fetchHero(juggernautID);
    // reduxProps.fetchData(juggernautID);
    // }, []);

    // const heroes = reduxProps.dota.heroes;
    // const heroes_stats = reduxProps.dota.heroes_stats;

    // let timings = [...reduxProps.dota.items_timings];
    // timings.sort((a, b) => a.time - b.time);
    // // timings.sort((a, b) => b.games - a.games);
    // // timings = timings.slice(0, MOST_POPULAR_ITEMS_AMOUNT);
    // // timings.sort((a, b) => b.winrate - a.winrate);
    // // timings = timings.slice(0, HIGHEST_WINRATE_ITEMS_AMOUNT);
    // console.log('TIMINGS');
    // console.log(timings);

    const heroes_stats = reduxProps.dota.heroes_stats;
    const hero = findHero(Number(heroId), heroes_stats);

    console.log('HERO DATA', hero);

    const heroMatchups = [...reduxProps.dota.hero_matchups];
    heroMatchups.sort((a, b) => a.winrate - b.winrate);
    // hero_id
    const heroMatchupsWorst = heroMatchups.slice(0, 7).map((hero: any) => {
        return {
            ...findHero(hero.hero_id, heroes_stats),
            winrate: hero.winrate
        };
    });
    const heroMatchupsBest = heroMatchups.slice(heroMatchups.length - 7, heroMatchups.length).map((hero: any) => {
        return {
            ...findHero(hero.hero_id, heroes_stats),
            winrate: hero.winrate
        };
    });

    console.log('MUW', heroMatchupsWorst)
    console.log('MUB', heroMatchupsBest)

    const firstPickWR = Math.floor(hero['1_win'] / hero['1_pick'] * 100);
    return (
        <div className="Hero">
            <h3 className="Hero-title"> Hero: </h3>
            <Link to='/'>
                <div className="BackButton">X</div>
            </Link>
            <div className='Hero-name'>
                {hero.localized_name}
            </div>
            <div className="Hero-image">
                <img src={baseURL + hero.img} />
            </div>
            <div className="Hero-attack_type">
                <span className="Hero-attack_type_title">Attack type:</span>
                {hero.attack_type}
            </div>
            <div className="Hero-primary_attr">
                <span className="Hero-primary_attr_title">Primary Attribute:</span>
                {hero.primary_attr}
            </div>
            <div className="Hero-1pick_winrate">
                {`${firstPickWR}%`}
            </div>
            <div className="Hero-roles">
                {hero.roles.map((role: any) =>
                    <div className="Hero-role">
                        {role}
                    </div>
                )}
            </div>
            <Matchups title='Best' matchups={heroMatchupsBest} />
            <Matchups title='Worst' matchups={heroMatchupsWorst} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Hero);
