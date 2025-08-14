<script>
  export let as = 'p';
  export let size = 'md'; // xs, sm, md, lg
  export let weight = 'normal'; // light, normal, medium, semibold, bold
  export let align = 'start'; // start, center, end
  export let leading = 'normal'; // tight, normal, relaxed
  export let muted = false; // when true, lower contrast using opacity token
  export let className = '';
  export let style = '';

  const sizeTokens = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem'
  };

  const lhTokens = {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75'
  };

  const weightTokens = {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  };

  const alignTokens = {
    start: 'left',
    center: 'center',
    end: 'right'
  };

  // Opacity tokens to emulate muted text without specifying custom colors
  const opacityTokens = {
    base: '1',
    muted: '0.75'
  };

  const resolvedSize = sizeTokens[size] ?? sizeTokens.md;
  const resolvedLH = lhTokens[leading] ?? lhTokens.normal;
  const resolvedWeight = weightTokens[weight] ?? weightTokens.normal;
  const resolvedAlign = alignTokens[align] ?? alignTokens.start;
  const resolvedOpacity = muted ? opacityTokens.muted : opacityTokens.base;
</script>

<svelte:element
  this={as}
  class={className}
  style={`color:currentColor;font-size:${resolvedSize};line-height:${resolvedLH};font-weight:${resolvedWeight};text-align:${resolvedAlign};opacity:${resolvedOpacity};${style}`}
>
  <slot />
</svelte:element>

