export const CHANGVALUE = {
    A: 0,
    'A#': 1,
    B: 2,
    C: 3,
    'C#': 4,
    D: 5,
    'D#': 6,
    E: 7,
    F: 8,
    'F#': 9,
    G: 10,
    'G#': 11
}
export const CHANGVALUELIST = Object.entries(CHANGVALUE).map(entry => { return { key: entry[0], value: entry[1] } })