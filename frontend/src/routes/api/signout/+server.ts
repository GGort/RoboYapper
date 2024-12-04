import {json, redirect} from '@sveltejs/kit';

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;

export async function GET({cookies}) {
    cookies.delete('disco_access_token', {path: '/'});
    cookies.delete('disco_refresh_token', {path: '/'});

    // Back channel logout


    return redirect(302, '/');
}
