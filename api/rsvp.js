import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // Simple auth check via header or reuse login logic. 
    // For simplicity playground, we trust the logic but in prod use session/token.

    if (req.method === 'GET') {
        try {
            // Create table if not exists (Lazy setup)
            await sql`CREATE TABLE IF NOT EXISTS rsvps (
            name varchar(255) PRIMARY KEY,
            attending varchar(50),
            hasPlusOne varchar(50),
            plusOneName varchar(255),
            bringingKids varchar(50),
            kids text[],
            lodging varchar(50),
            dietary text,
            note text,
            timestamp varchar(255),
            guestCount int
         );`;

            const { rows } = await sql`SELECT * FROM rsvps`;
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        const data = req.body;
        try {
            await sql`CREATE TABLE IF NOT EXISTS rsvps (
            name varchar(255) PRIMARY KEY,
            email text,
            attending varchar(50),
            hasPlusOne varchar(50),
            plusOneName varchar(255),
            bringingKids varchar(50),
            kids text[],
            lodging varchar(50),
            dietary text,
            note text,
            timestamp varchar(255),
            guestCount int
         );`;

            // Ensure column exists for existing tables
            try {
                await sql`ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS email TEXT;`;
            } catch (e) {
                // Ignore error if column exists or not supported in this context
                console.log('Migration note:', e.message);
            }

            // Upsert
            await sql`
            INSERT INTO rsvps (name, email, attending, hasPlusOne, plusOneName, bringingKids, kids, lodging, dietary, note, timestamp, guestCount)
            VALUES (${data.name}, ${data.email}, ${data.attending}, ${data.hasPlusOne}, ${data.plusOneName}, ${data.bringingKids}, ${data.kids}, ${data.lodging}, ${data.dietary}, ${data.note}, ${data.timestamp}, ${data.guestCount})
            ON CONFLICT (name) DO UPDATE SET
            email = EXCLUDED.email,
            attending = EXCLUDED.attending,
            hasPlusOne = EXCLUDED.hasPlusOne,
            plusOneName = EXCLUDED.plusOneName,
            bringingKids = EXCLUDED.bringingKids,
            kids = EXCLUDED.kids,
            lodging = EXCLUDED.lodging,
            dietary = EXCLUDED.dietary,
            note = EXCLUDED.note,
            timestamp = EXCLUDED.timestamp,
            guestCount = EXCLUDED.guestCount;
        `;
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'DELETE') {
        const { name } = req.query;
        try {
            await sql`DELETE FROM rsvps WHERE name = ${name}`;
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
