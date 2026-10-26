import LinkButton from "@/components/ui/LinkButton";

// Shown for any URL that does not match a page
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <div className="mt-8">
        <LinkButton href="/">Go to Home</LinkButton>
      </div>
    </div>
  );
}
