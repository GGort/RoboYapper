import {redirect} from "@sveltejs/kit";

export async function load({ locals }) {
    if (!locals.authorized) {
        return redirect(303, "/api/auth");
    }
}
