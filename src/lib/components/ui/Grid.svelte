<script>
  export let as = 'div';
  export let columns = '12'; // 2,3,4,6,12
  export let gap = 'md'; // none, xs, sm, md, lg, xl
  export let className = '';
  export let style = '';

  const colTokens = {
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
    '6': 'repeat(6, minmax(0, 1fr))',
    '12': 'repeat(12, minmax(0, 1fr))'
  };

  const spaceTokens = {
    none: '0',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  };

  const resolvedCols = colTokens[columns] ?? colTokens['12'];
  const resolvedGap = spaceTokens[gap] ?? spaceTokens.md;
</script>

<svelte:element
  this={as}
  class={className}
  style={`display:grid;grid-template-columns:${resolvedCols};gap:${resolvedGap};${style}`}
>
  <slot />
</svelte:element>

