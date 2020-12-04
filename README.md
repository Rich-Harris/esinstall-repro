# esinstall-repro

esinstall can install Svelte components from npm, but only if the pkg.svelte field corresponds to a .svelte file, which isn't always the case.

If the component is imported by an intermediate JavaScript module _and_ includes CSS, esinstall will spin its wheels for a while and eventually run out of memory.

```
# this works, because svelte-scroller exposes a single .svelte file
node install @sveltejs/svelte-scroller

# this fails
node install @sveltejs/pancake
```