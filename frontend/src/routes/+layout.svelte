<script lang="ts">
    import "../app.css";

    let {data, children} = $props();

    import {
        Navbar,
        NavBrand,
        FooterBrand,
        FooterLinkGroup,
        FooterLink,
        DarkMode,
        Footer,
        Avatar,
        Dropdown,
        DropdownHeader,
        DropdownItem,
        DropdownDivider,
        Button
    } from "flowbite-svelte";

    const pfpSrc = `https://cdn.discordapp.com/avatars/${data.user?.id}/${data.user?.avatar}.webp`;
</script>

<div class="min-h-screen">
    <Navbar>
        <NavBrand>Roboyapper</NavBrand>
        <div class="flex flex-row">
            {#if data.authorized}
                <Avatar id="user-drop" src={pfpSrc} class="cursor-pointer" />
                <Dropdown triggeredBy="#user-drop">
                    <DropdownHeader>
                        <span class="block text-sm capitalize">{data.user?.username}</span>
                    </DropdownHeader>
                    <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="/api/signout">Sign out</DropdownItem>
                </Dropdown>
            {:else}
                <Button href="/api/auth" >Sign In</Button>
            {/if}
        </div>
    </Navbar>
    {@render children()}
</div>

<Footer footerType="logo">
    <div class="sm:flex sm:items-center sm:justify-between">
        <FooterBrand src="/images/flowbite-svelte-icon-logo.svg" alt="RoboYapper Logo" name="RoboYapper" />
        <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <FooterLink href="https://github.com/GGort/RoboYapper">Github</FooterLink>
            <DarkMode />
        </FooterLinkGroup>
    </div>
</Footer>
