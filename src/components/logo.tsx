export default function Logo({ className = '' }: { className?: string }) {
  return <img className={className} src='/logo.svg' alt='logo' />;
}
