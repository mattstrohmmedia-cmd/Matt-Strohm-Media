type Props = {
  label?: string;
  aspect?: 'wide' | 'square' | 'tall' | 'hero' | 'free';
  className?: string;
};

const aspectClass = {
  wide:   'aspect-[16/10]',
  square: 'aspect-square',
  tall:   'aspect-[3/4]',
  hero:   'aspect-[16/9]',
  free:   '',
} as const;

export function Placeholder({ label, aspect = 'free', className = '' }: Props) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-center px-4 ${aspectClass[aspect]} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #161616 0%, #1f1f1f 50%, #161616 100%)',
        border: '1px dashed rgba(255,255,255,0.08)',
      }}
    >
      {label && (
        <span
          style={{
            color: '#6b6560',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
