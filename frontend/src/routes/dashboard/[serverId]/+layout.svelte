<script lang="ts">
    import {page} from "$app/stores";
    import Icon from "@iconify/svelte";
    import {Sidebar, SidebarGroup, SidebarItem, SidebarWrapper} from "flowbite-svelte";

    let {children} = $props();
    let activeUrl = $derived($page.url.pathname);
</script>

<div class="flex gap-2 pt-1" style="height: calc(100vh - 4rem)">
    <Sidebar class="h-full w-64" activeUrl={activeUrl}>
        <SidebarWrapper class="h-full">
            <SidebarGroup>
                <SidebarItem label="Dashboard" href="/dashboard/2">
                    <svelte:fragment slot="icon">
                        <Icon icon="mdi-view-dashboard" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>

    <div class="overflow-scroll">
        {@render children()}
    </div>
</div>
