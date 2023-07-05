import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHeroesStatsThunk } from '../../reducers/dota';
import { baseURL } from '../../const';

import './index.css';

function Heroes(reduxProps: any) {
    console.log('RENDER CALL', reduxProps);

    useEffect(() => {
        reduxProps.fetchData();
    }, []);

    const heroes = reduxProps.dota.heroes;

    return (
        <div className="HeroList">
            <h3 className="HeroList-title"> Heroes: </h3>
            {Object.values(heroes).map(({ main: hero }: any) =>
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

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    fetchData: () => {
        dispatch(fetchHeroesStatsThunk());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
