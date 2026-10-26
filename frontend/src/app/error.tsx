"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";

// Shown when a page crashes unexpectedly, instead of a blank screen
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-gray-500">Sorry, this page could not be loaded. Please try again.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => retry()}>Try Again</Button>
        <LinkButton href="/" variant="secondary">
          Go to Home
        </LinkButton>
      </div>
    </div>
  );
}
