import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Name required' });
    }

    try {
        // Ensure table exists (just in case)
        await sql`CREATE TABLE IF NOT EXISTS allowed_guests (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            added_at varchar(255)
        );`;

        // Normalize input: Lowercase and trimmed
        const searchName = name.toLowerCase().trim();

        // Query the database. We fetch all and filter in JS or use ILIKE for partial matches.
        // Using ILIKE is better for database performance.
        // We check if the PROVIDED name exists in the allowed list.
        // IMPORTANT: The comparison should likely be strict enough to avoid "Max" matching "Maximilian".
        // But the user might type "Julia" and the list has "Julia & Max".
        // For now, let's look for a case-insensitive exact match OR if the allowed name *contains* the input (riskier).
        // Safest: The user must type the name exactly as on the invitation (or close enough).

        // Let's do a case-insensitive check.
        const { rows } = await sql`SELECT * FROM allowed_guests WHERE LOWER(name) = ${searchName}`;

        if (rows.length > 0) {
            return res.status(200).json({ valid: true, guest: rows[0] });
        } else {
            // Soft fallback: Try partial match if exact fails? 
            // Maybe safer to stick to strict initially.
            return res.status(200).json({ valid: false });
        }

    } catch (error) {
        console.error('Database error:', error);
        // Fallback for dev without DB connection:
        return res.status(500).json({ error: 'Validation failed' });
    }
}
