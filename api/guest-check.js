export const guests = [
    { id: 1, name: "Maria Musterfrau", allowedGuests: 2 },
    { id: 2, name: "Hans Dampf", allowedGuests: 1 },
    { id: 3, name: "Tante Erna", allowedGuests: 1 },
    { id: 4, name: "Onkel Heinz", allowedGuests: 2 },
    { id: 5, name: "Familie Müller", allowedGuests: 4 },
    { id: 6, name: "Julia & Max", allowedGuests: 2 }, // Testing
];

export default function handler(req, res) {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Name required' });
    }

    const normalize = (str) => str.toLowerCase().trim();
    const foundGuest = guests.find(g => normalize(g.name) === normalize(name));

    if (foundGuest) {
        return res.status(200).json({ valid: true, guest: foundGuest });
    } else {
        return res.status(200).json({ valid: false });
    }
}
