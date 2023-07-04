import { baseURL } from '../../const';

import './index.css';

export default function Matchups(props: any) {
    const { matchups, title } = props;

    return (
        <div className='Matchups'>
            <div className='Matchups-title'>
                {title}
            </div>
            <div className='Matchups-list'>
                {matchups.map((hero: any) =>
                    <div className='Matchups-item' key={hero.id}>
                        <div className='Matchups-item-name'>
                            {hero.localized_name}
                        </div>
                        <div className='Matchups-item-icon'>
                            <img src={baseURL + hero.icon} />
                        </div>
                        <div className='Matchups-item-winrate'>
                            {hero.winrate}%
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
