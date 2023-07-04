export interface Heroes {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
};

export interface HeroMatchup {
    hero_id: number;
    games_played: number;
    wins: number;
};

export interface HeroMatchDurations {
    duration_bin: string;
    games_played: number;
    wins: number;
};

export interface HeroItems {
    start_game_items: {
        item: number;
    };
    early_game_items: {
        item: number;
    };
    mid_game_items: {
        item: number;
    };
    late_game_items: {
        item: number;
    }
};

export interface HeroPerformance {
    percentile: number;
    value: number;
}

export interface HeroBenchmarks {
    hero_id: number;
    result: {
        gold_per_min: HeroPerformance[];
        xp_per_min: HeroPerformance[];
        kills_per_min: HeroPerformance[];
        last_hits_per_min: HeroPerformance[];
        hero_damage_per_min: HeroPerformance[];
        hero_healing_per_min: HeroPerformance[];
        tower_damage: HeroPerformance[];
    }
};

// all items. filter by specific item. fe spirit_vessel
// Can be filter through query params item: string and hero_id: number;
// Win rates for certain item timings on a hero for items that cost at least 1400 gold
export interface HeroItemTimings {
    hero_id: number;
    item: string;
    time: number;
    games: number;
    wins: number;
    winrate: number;
};

export interface LaneRoles {
    hero_id: number;
    lane_role: number;
    time: number;
    games: string;
    wins: string;
};

export interface HeroStats {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    img: string;
    icon: string;
    base_health: number;
    base_health_regen: number;
    base_mana: number;
    base_mana_regen: number;
    base_armor: number;
    base_mr: number;
    base_attack_min: number;
    base_attack_max: number;
    base_str: number;
    base_agi: number;
    base_int: number;
    str_gain: number;
    agi_gain: number;
    int_gain: number;
    attack_range: number;
    projectile_speed: number;
    attack_rate: number;
    base_attack_time: number;
    attack_point: number;
    move_speed: number;
    turn_rate: number;
    cm_enabled: boolean;
    legs: number;
    day_vision: number;
    night_vision: number;
    hero_id: number;
    turbo_picks: number;
    turbo_wins: number;
    pro_ban: number;
    pro_win: number;
    pro_pick: number;
    '1_pick': number;
    '1_win': number;
    '2_pick': number;
    '2_win': number;
    '3_pick': number;
    '3_win': number;
    '4_pick': number;
    '4_win': number;
    '5_pick': number;
    '5_win': number;
    '6_pick': number;
    '6_win': number;
    '7_pick': number;
    '7_win': number;
    '8_pick': number;
    '8_win': number;
    null_pick: number;
    null_win: number;
};
