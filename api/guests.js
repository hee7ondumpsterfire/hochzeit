import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // SECURITY: In a real app, verify the admin session/token here.
    // For now, we assume the Admin frontend protects access securely enough for this context,
    // or we can add a simple password header check if desired.

    if (req.method === 'GET') {
        try {
            await sql`CREATE TABLE IF NOT EXISTS allowed_guests (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                added_at varchar(255)
            );`;

            const { rows } = await sql`SELECT * FROM allowed_guests ORDER BY name ASC`;
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        try {
            await sql`CREATE TABLE IF NOT EXISTS allowed_guests (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                added_at varchar(255)
            );`;

            await sql`INSERT INTO allowed_guests (name, added_at) VALUES (${name}, ${new Date().toISOString()}) ON CONFLICT (name) DO NOTHING`;
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'ID is required' });

        try {
            await sql`DELETE FROM allowed_guests WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
