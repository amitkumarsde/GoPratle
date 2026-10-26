import LinkButton from "@/components/ui/LinkButton";
import { ClipboardList, MicVocal, Users } from "lucide-react";

const categories = [
  { icon: ClipboardList, title: "Event Planner", text: "Get help planning and managing your whole event." },
  { icon: MicVocal, title: "Performer", text: "Find singers, DJs, bands, dancers and hosts." },
  { icon: Users, title: "Crew", text: "Hire photographers, sound, lighting and event staff." },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Find the right people for <br /> <span className="text-brand">your event</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Post your event requirement in 4 simple steps and connect with planners, performers and crew.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/post">Post a Requirement</LinkButton>
          <LinkButton href="/posts" variant="secondary">
            View All Posts
          </LinkButton>
        </div>
      </section>

      <section className="mt-16 grid gap-10 border-t border-gray-200 pt-12 sm:grid-cols-3">
        {categories.map((category) => (
          <div key={category.title}>
            <div className="flex items-center gap-2">
              <category.icon size={28} className="text-brand" />
              <h2 className="text-lg font-semibold">{category.title}</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">{category.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
