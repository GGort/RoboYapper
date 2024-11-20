<script>
	import '../app.css';
	let { children } = $props();
  import { page } from '$app/stores';

  import { Navbar, NavBrand, NavUl, NavLi , NavHamburger, DarkMode, Footer} from "flowbite-svelte";

  let activeUrl = $derived($page.url.pathname);
</script>

<div class="min-h-screen">

<Navbar>
  <NavBrand>Roboyapper</NavBrand>

  <div class="flex flex-row">
    <NavUl {activeUrl}>
      <NavLi href="/">Home</NavLi>
    </NavUl>
    <NavHamburger/>

    <DarkMode />
  </div>
</Navbar>

{@render children()}
</div>
<Footer>

</Footer>
