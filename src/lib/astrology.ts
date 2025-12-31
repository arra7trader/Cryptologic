/**
 * Real Astrological Calculations using astronomy-engine
 * Based on NASA JPL ephemeris data
 */

import * as Astronomy from 'astronomy-engine';

// Zodiac signs
const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

type ZodiacSign = typeof ZODIAC_SIGNS[number];

// Element mapping for signs
const SIGN_ELEMENTS: Record<ZodiacSign, 'Fire' | 'Earth' | 'Air' | 'Water'> = {
    Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water',
    Leo: 'Fire', Virgo: 'Earth', Libra: 'Air', Scorpio: 'Water',
    Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water'
};

// Bullish elements for crypto (Fire and Air = expansion, innovation)
const BULLISH_ELEMENTS = ['Fire', 'Air'];

export interface AstrologyData {
    moonPhase: number; // 0-1 (0 = New Moon, 0.5 = Full Moon)
    moonPhaseName: string;
    mercuryRetrograde: boolean;
    planets: {
        sun: { sign: ZodiacSign; longitude: number };
        moon: { sign: ZodiacSign; longitude: number };
        mercury: { sign: ZodiacSign; longitude: number };
        venus: { sign: ZodiacSign; longitude: number };
        mars: { sign: ZodiacSign; longitude: number };
        jupiter: { sign: ZodiacSign; longitude: number };
        saturn: { sign: ZodiacSign; longitude: number };
    };
    cosmicScore: number; // 0-100
    trend: 'Bullish' | 'Bearish' | 'Neutral';
    keyEvent: string;
}

/**
 * Get zodiac sign from ecliptic longitude
 */
function getZodiacSign(longitude: number): ZodiacSign {
    const normalizedLon = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLon / 30);
    return ZODIAC_SIGNS[signIndex];
}

/**
 * Get planet's ecliptic longitude
 */
function getPlanetLongitude(body: Astronomy.Body, date: Date): number {
    const time = Astronomy.MakeTime(date);

    if (body === Astronomy.Body.Moon) {
        const ecliptic = Astronomy.EclipticGeoMoon(time);
        return ecliptic.lon;
    }

    // For other bodies, use EclipticLongitude directly
    return Astronomy.EclipticLongitude(body, time);
}

/**
 * Calculate moon phase (0-1)
 */
function getMoonPhase(date: Date): { phase: number; name: string } {
    const time = Astronomy.MakeTime(date);
    const phase = Astronomy.MoonPhase(time);

    // phase is 0-360 degrees, convert to 0-1
    const phaseNormalized = phase / 360;

    let name: string;
    if (phase < 22.5) name = 'New Moon';
    else if (phase < 67.5) name = 'Waxing Crescent';
    else if (phase < 112.5) name = 'First Quarter';
    else if (phase < 157.5) name = 'Waxing Gibbous';
    else if (phase < 202.5) name = 'Full Moon';
    else if (phase < 247.5) name = 'Waning Gibbous';
    else if (phase < 292.5) name = 'Last Quarter';
    else if (phase < 337.5) name = 'Waning Crescent';
    else name = 'New Moon';

    return { phase: phaseNormalized, name };
}

/**
 * Check if Mercury is in retrograde
 * Mercury appears to move backwards when its ecliptic longitude decreases
 */
function isMercuryRetrograde(date: Date): boolean {
    const time1 = Astronomy.MakeTime(date);
    const time2 = Astronomy.MakeTime(new Date(date.getTime() - 24 * 60 * 60 * 1000)); // 1 day ago

    const pos1 = Astronomy.EclipticLongitude(Astronomy.Body.Mercury, time1);
    const pos2 = Astronomy.EclipticLongitude(Astronomy.Body.Mercury, time2);

    // If current position is less than yesterday (accounting for 360° wraparound)
    let diff = pos1 - pos2;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    return diff < 0;
}

/**
 * Calculate Cosmic Score based on real astrological factors
 */
export function calculateAstrology(date: Date = new Date()): AstrologyData {
    const time = Astronomy.MakeTime(date);

    // Get moon phase
    const moonData = getMoonPhase(date);

    // Check Mercury retrograde
    const mercuryRetro = isMercuryRetrograde(date);

    // Get planetary positions
    const sunLon = Astronomy.EclipticLongitude(Astronomy.Body.Sun, time);
    const moonLon = getPlanetLongitude(Astronomy.Body.Moon, date);
    const mercuryLon = Astronomy.EclipticLongitude(Astronomy.Body.Mercury, time);
    const venusLon = Astronomy.EclipticLongitude(Astronomy.Body.Venus, time);
    const marsLon = Astronomy.EclipticLongitude(Astronomy.Body.Mars, time);
    const jupiterLon = Astronomy.EclipticLongitude(Astronomy.Body.Jupiter, time);
    const saturnLon = Astronomy.EclipticLongitude(Astronomy.Body.Saturn, time);

    const planets = {
        sun: { sign: getZodiacSign(sunLon), longitude: sunLon },
        moon: { sign: getZodiacSign(moonLon), longitude: moonLon },
        mercury: { sign: getZodiacSign(mercuryLon), longitude: mercuryLon },
        venus: { sign: getZodiacSign(venusLon), longitude: venusLon },
        mars: { sign: getZodiacSign(marsLon), longitude: marsLon },
        jupiter: { sign: getZodiacSign(jupiterLon), longitude: jupiterLon },
        saturn: { sign: getZodiacSign(saturnLon), longitude: saturnLon },
    };

    // Calculate Cosmic Score (0-100)
    let score = 50; // Base score

    // Moon Phase Factor (±15 points)
    // Full moon (0.5) = high volatility, neutral score
    // New moon (0.0 or 1.0) = new beginnings, slightly bullish
    const moonFactor = Math.abs(moonData.phase - 0.5) * 2; // 0 at full, 1 at new
    score += (moonFactor - 0.5) * 15;

    // Mercury Retrograde (−10 points)
    if (mercuryRetro) {
        score -= 10;
    }

    // Jupiter in bullish element (Fire/Air) = +10 points
    if (BULLISH_ELEMENTS.includes(SIGN_ELEMENTS[planets.jupiter.sign])) {
        score += 10;
    }

    // Saturn in restrictive signs (Capricorn, Scorpio) = −5 points
    if (['Capricorn', 'Scorpio'].includes(planets.saturn.sign)) {
        score -= 5;
    }

    // Mars in Fire signs = +8 points (aggressive growth)
    if (SIGN_ELEMENTS[planets.mars.sign] === 'Fire') {
        score += 8;
    }

    // Venus in Earth signs = +5 points (stable value)
    if (SIGN_ELEMENTS[planets.venus.sign] === 'Earth') {
        score += 5;
    }

    // Sun-Moon aspect (approximate by longitude difference)
    const sunMoonDiff = Math.abs(sunLon - moonLon);
    if (sunMoonDiff < 10 || sunMoonDiff > 350) {
        // Conjunction = New Moon energy
        score += 3;
    } else if (Math.abs(sunMoonDiff - 120) < 10 || Math.abs(sunMoonDiff - 240) < 10) {
        // Trine = harmonious
        score += 7;
    } else if (Math.abs(sunMoonDiff - 90) < 10 || Math.abs(sunMoonDiff - 270) < 10) {
        // Square = tension
        score -= 5;
    }

    // Clamp score to 0-100
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Determine trend
    let trend: 'Bullish' | 'Bearish' | 'Neutral';
    if (score >= 60) trend = 'Bullish';
    else if (score <= 40) trend = 'Bearish';
    else trend = 'Neutral';

    // Determine key event
    let keyEvent = moonData.name;
    if (mercuryRetro) keyEvent = 'Mercury Retrograde';
    if (moonData.name === 'Full Moon') keyEvent = 'Full Moon';
    if (moonData.name === 'New Moon') keyEvent = 'New Moon';

    return {
        moonPhase: moonData.phase,
        moonPhaseName: moonData.name,
        mercuryRetrograde: mercuryRetro,
        planets,
        cosmicScore: score,
        trend,
        keyEvent,
    };
}

/**
 * Generate per-coin cosmic score with coin-specific modifier
 * Uses coin ID hash to create slight variations while maintaining
 * the same overall astrological influence
 */
export function getCoinCosmicScore(coinId: string, date: Date = new Date()): AstrologyData {
    const baseData = calculateAstrology(date);

    // Create a deterministic modifier based on coin ID (-5 to +5)
    let hash = 0;
    for (let i = 0; i < coinId.length; i++) {
        hash = ((hash << 5) - hash) + coinId.charCodeAt(i);
        hash = hash & hash;
    }
    const modifier = (Math.abs(hash) % 11) - 5; // -5 to +5

    // Apply modifier to score
    const adjustedScore = Math.max(0, Math.min(100, baseData.cosmicScore + modifier));

    // Adjust trend based on new score
    let trend: 'Bullish' | 'Bearish' | 'Neutral';
    if (adjustedScore >= 60) trend = 'Bullish';
    else if (adjustedScore <= 40) trend = 'Bearish';
    else trend = 'Neutral';

    return {
        ...baseData,
        cosmicScore: adjustedScore,
        trend,
    };
}
