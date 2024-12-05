export async function load({ locals }) {
    let userInfo = null;

    if (locals.user) {
        userInfo = {
            id: locals.user.id,
            username: locals.user.username,
            email: locals.user.email,
        }
    }

    return {
        authorized: locals.authorized,
        user: userInfo,
    };
}
