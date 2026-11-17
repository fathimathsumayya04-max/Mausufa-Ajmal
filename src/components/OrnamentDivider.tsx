interface OrnamentDividerProps {
  tone?: 'teal' | 'light' | 'ivory' | 'gold';
  width?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Clean & Elegant Luxury Wedding Invitation Rule Divider
 * Subtle, thin gold hairline rule with soft tapered ends.
 * Completely free of decorative maroon motifs.
 */
export function OrnamentDivider({
  tone = 'gold',
  width = 'md',
  className = '',
}: OrnamentDividerProps) {
  const maxWidths: Record<NonNullable<OrnamentDividerProps['width']>, string> = {
    sm: '140px',
    md: '220px',
    lg: '300px',
  };

  const isLight = tone === 'light' || tone === 'ivory' || tone === 'gold';
  const lineColor = isLight
    ? 'rgba(254, 240, 138, 0.45)'
    : 'rgba(223, 168, 54, 0.35)';

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        width: '100%',
        maxWidth: maxWidths[width],
        margin: '0 auto',
      }}
    >
      <span
        style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${lineColor})`,
        }}
      />
      <span
        style={{
          width: '4px',
          height: '4px',
          transform: 'rotate(45deg)',
          backgroundColor: lineColor,
          opacity: 0.75,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(90deg, ${lineColor}, transparent)`,
        }}
      />
    </div>
  );
}
