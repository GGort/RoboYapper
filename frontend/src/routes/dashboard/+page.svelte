<script lang="ts">
    import {Avatar, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button} from "flowbite-svelte";

    const {data} = $props();
</script>
<div class="p-2">

    <h1>Dashboard</h1>

    <br>

    <h2>Servers:</h2>
    <Table>
        <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Active</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody  tableBodyClass="divide-y">
            {#each data.guilds as guild}
                <TableBodyRow>
                    <TableBodyCell>
                        <div class="flex items-center gap-3">
                            <Avatar src={`https://cdn.discordapp.com/icons/${guild.dcId}/${guild.icon}.webp`} />
                            <h3>{guild.name}</h3>
                        </div>
                    </TableBodyCell>
                    <TableBodyCell>{guild.active}</TableBodyCell>
                    <TableBodyCell><Button href={`/dashboard/${guild.id}/`}>Open</Button></TableBodyCell>
                </TableBodyRow>
            {/each}

        </TableBody>
    </Table>

</div>
