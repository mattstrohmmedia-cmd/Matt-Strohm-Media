/* eslint-disable @next/next/no-img-element */
type Props = {
  size?: number;
  className?: string;
  'data-nav-logo'?: boolean;
};

export function Monogram({ size = 32, className = '', 'data-nav-logo': dataNavLogo }: Props) {
  return (
    <img
      src="/images/logos/msm.png"
      alt="Matt Strohm Media"
      height={size}
      style={{ height: size, width: 'auto', mixBlendMode: 'screen' }}
      className={className}
      draggable={false}
      data-nav-logo={dataNavLogo ? '' : undefined}
    />
  );
}
