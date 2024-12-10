import {redirect} from '@sveltejs/kit';


export async function GET({cookies}) {
    cookies.delete('disco_access_token', {path: '/'});
    cookies.delete('disco_refresh_token', {path: '/'});

    // TODO: Back channel logout

    return redirect(302, '/');
}
