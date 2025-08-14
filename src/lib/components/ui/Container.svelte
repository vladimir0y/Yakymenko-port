<script>
  export let as = 'div';
  // max token: container width
  export let max = 'lg'; // sm, md, lg, xl, 2xl
  // padding token for inline axis
  export let px = 'md'; // none, xs, sm, md, lg, xl
  export let className = '';
  export let style = '';

  const maxTokens = {
    sm: '40rem', // 640px
    md: '48rem', // 768px
    lg: '64rem', // 1024px
    xl: '80rem', // 1280px
    '2xl': '90rem' // 1440px
  };

  const spaceTokens = {
    none: '0',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  };

  const resolvedMax = maxTokens[max] ?? maxTokens.lg;
  const resolvedPx = spaceTokens[px] ?? spaceTokens.md;
</script>

<svelte:element
  this={as}
  class={className}
  style={`margin-inline:auto;max-width:${resolvedMax};padding-inline:${resolvedPx};${style}`}
>
  <slot />
</svelte:element>

