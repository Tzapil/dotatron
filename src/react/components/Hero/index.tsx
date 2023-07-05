import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchHeroByIdThunk } from '../../reducers/dota';
import { baseURL } from '../../const';
import Matchups from '../Matchups';

import './index.css';

function Hero(reduxProps: any) {
    const { id: heroId } = useParams();
    console.log('HERO ROUTER CALL', heroId, reduxProps);

    useEffect(() => {
        reduxProps.fetchData(heroId);
    }, [heroId]);

    const heroes = reduxProps.dota.heroes;
    const heroData = heroes[heroId];
    const hero = heroData.main;

    console.log('HERO DATA', hero);

    const heroMatchups = [...heroData.extra.hero_matchups];
    heroMatchups.sort((a, b) => a.winrate - b.winrate);
    // hero_id
    const heroMatchupsWorst = heroMatchups.slice(0, 7).map((hero: any) => {
        return {
            ...reduxProps.dota.heroes[hero.hero_id].main,
            winrate: hero.winrate
        };
    });
    const heroMatchupsBest = heroMatchups.slice(heroMatchups.length - 7, heroMatchups.length).map((hero: any) => {
        return {
            ...reduxProps.dota.heroes[hero.hero_id].main,
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
    fetchData: (id: number) => {
        dispatch(fetchHeroByIdThunk(id));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Hero);
