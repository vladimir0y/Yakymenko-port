<script>
  export let as = 'div';
  export let gap = 'md'; // none, xs, sm, md, lg, xl
  export let align = 'start'; // start, center, end, stretch
  export let justify = 'start'; // start, center, end, between
  export let direction = 'column'; // row, column
  export let className = '';
  export let style = '';

  const spaceTokens = {
    none: '0',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  };

  const alignTokens = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch'
  };

  const justifyTokens = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between'
  };

  const dirTokens = { row: 'row', column: 'column' };

  const resolvedGap = spaceTokens[gap] ?? spaceTokens.md;
  const resolvedAlign = alignTokens[align] ?? alignTokens.start;
  const resolvedJustify = justifyTokens[justify] ?? justifyTokens.start;
  const resolvedDir = dirTokens[direction] ?? dirTokens.column;
</script>

<svelte:element
  this={as}
  class={className}
  style={`display:flex;flex-direction:${resolvedDir};align-items:${resolvedAlign};justify-content:${resolvedJustify};gap:${resolvedGap};${style}`}
>
  <slot />
</svelte:element>

