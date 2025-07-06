export default function LogoExpanded({
  className = ''
}: {
  className?: string;
}) {
  return (
    <img className={className} src='/logo-expanded.svg' alt='logo-expanded' />
  );
}
