import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchHeroByIdThunk } from '../../reducers/dota';
import { baseURL } from '../../const';
import Matchups from '../Matchups';

import './index.css';

const AttrMap: Record<string, string> = {
    str: 'Strength',
    agi: 'Agility',
    int: 'Intellect',
    all: 'Universal'
};

const Attributes = ['str', 'agi', 'int'];

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
            <h3 className="Hero-title">
                <span className="Hero-title-name">{hero.localized_name}</span>
                <span className="Hero-title-roles">
                    {hero.roles.map((role: any) =>
                        <div className="Hero-role">
                            {role}
                        </div>
                    )}
                </span>
            </h3>
            <div className="Hero-info">
                <div className="Hero-attack_type">
                    <span className="Hero-attack_type_text">{hero.attack_type}</span>
                    <img className='Hero-attack_type_icon' src={`../images/attack/${hero.attack_type}.webp`} />
                </div>
                <div className="Hero-primary_attr">
                    <span className='Hero-primary_attr_text'>{AttrMap[hero.primary_attr]}</span>
                    <img className='Hero-primary_attr_icon' src={`../images/attributes/${hero.primary_attr}.webp`} />
                </div>
            </div>
            
            <img className="Hero-image" src={baseURL + hero.img} />

            <div className="Hero-attributes">
                {Attributes.map(attr =>
                    <div className="Hero-attributes-item">
                        <img className='Hero-attributes-item_icon' src={`../images/attributes/${attr}.webp`} />
                        <span className='Hero-attributes-item_text' >{hero[`base_${attr}`]}+{hero[`${attr}_gain`]}</span>
                    </div>
                )}
            </div>

            <div className="Hero-1pick_winrate">
                {`${firstPickWR}%`}
            </div>
            <Matchups title='Best' matchups={heroMatchupsBest} />
            <Matchups title='Worst' matchups={heroMatchupsWorst} />

            <Link to='/'>
                <div className="BackButton">X</div>
            </Link>
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
