import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const apiUrl = process.env.API_URL_CHARACTERS
        || process.env.API_URL_SERIES
        || 'https://hp-api.onrender.com/api/characters';

    try {
        const resp = await axios.get(apiUrl, {
            params: Object.fromEntries(searchParams),
        });
        return NextResponse.json(resp.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao buscar personagens.' };

        return NextResponse.json(data, { status });
    }
}
