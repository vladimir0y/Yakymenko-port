<script>
  export let as = 'h2';
  export let size = 'lg'; // xs, sm, md, lg, xl, 2xl, 3xl
  export let weight = 'bold'; // light, normal, medium, semibold, bold, black
  export let align = 'start'; // start, center, end
  export let clamp; // optional number of lines to clamp
  export let className = '';
  export let style = '';

  const sizeTokens = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem'
  };

  const lhTokens = {
    xs: '1.2',
    sm: '1.25',
    md: '1.3',
    lg: '1.3',
    xl: '1.2',
    '2xl': '1.1',
    '3xl': '1.05'
  };

  const weightTokens = {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900'
  };

  const alignTokens = {
    start: 'left',
    center: 'center',
    end: 'right'
  };

  const resolvedSize = sizeTokens[size] ?? sizeTokens.lg;
  const resolvedLH = lhTokens[size] ?? lhTokens.lg;
  const resolvedWeight = weightTokens[weight] ?? weightTokens.bold;
  const resolvedAlign = alignTokens[align] ?? alignTokens.start;

  let clampStyles = '';
  if (clamp && Number.isFinite(clamp)) {
    clampStyles = `display:-webkit-box; -webkit-line-clamp:${clamp}; -webkit-box-orient: vertical; overflow:hidden;`;
  }
</script>

<svelte:element
  this={as}
  class={className}
  style={`font-size:${resolvedSize};line-height:${resolvedLH};font-weight:${resolvedWeight};text-align:${resolvedAlign};${clampStyles}${style}`}
>
  <slot />
</svelte:element>

