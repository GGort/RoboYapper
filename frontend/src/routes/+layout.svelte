<script lang="ts">
    import "../app.css";

    let {data, children} = $props();
    import {page} from "$app/stores";

    import {Navbar, NavBrand, NavUl, NavLi, NavHamburger, DarkMode, Footer} from "flowbite-svelte";

    let activeUrl = $derived($page.url.pathname);
</script>

<div class="min-h-screen">

    <Navbar>
        <NavBrand>Roboyapper</NavBrand>

        <div class="flex flex-row">
            <NavUl {activeUrl}>
                <NavLi href="/">Home</NavLi>
                <NavLi href="/dashboard">Dashboard</NavLi>
                {#if data.authorized}
                    <NavLi href="/api/signout">logout</NavLi>
                {:else}
                    <NavLi href="/api/auth">login</NavLi>
                {/if}
            </NavUl>
            <NavHamburger />

            <DarkMode />
        </div>
    </Navbar>
    <h1>{data.authorized} | {data.user?.username}</h1>

    {@render children()}
</div>
<Footer>

</Footer>
