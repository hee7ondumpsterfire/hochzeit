export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password, type } = req.body;
    const SITE_PASSWORD = process.env.SITE_PASSWORD;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (type === 'admin') {
        if (password === ADMIN_PASSWORD) {
            return res.status(200).json({ success: true });
        }
    } else {
        if (password === SITE_PASSWORD) {
            return res.status(200).json({ success: true });
        }
    }

    return res.status(401).json({ error: 'Incorrect password' });
}
