import SportoviskoComponent from "./sportovisko";
import { api } from "@/trpc/server";
import SearchSportovisko from "./SearchSportovisko";

export default async function List({
  searchParams,
}: {
  searchParams?: { q: string | undefined };
}) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { q } = (await searchParams) ?? { q: "" };

  const sportoviska = await api.sportoviska.getAll({ q: q ?? "" });

  return (
    <div className="mt-2 flex flex-col items-center gap-3">
      <SearchSportovisko />
      <div className="flex flex-wrap justify-center gap-2">
        {sportoviska.map((sportovisko, i) => (
          <SportoviskoComponent key={i} {...sportovisko} />
        ))}
      </div>
    </div>
  );
}
