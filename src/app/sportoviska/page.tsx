import { Accordion } from "@/components/ui/accordion";
import SportoviskoComponent from "./sportovisko";
import { api } from "@/trpc/server";

export default async function List() {
  const sportoviska = await api.sportoviska.getAll();
  return (
    <>
      <Accordion type="single" collapsible>
        {sportoviska.map((sportovisko, i) => (
          <SportoviskoComponent key={i} {...sportovisko} />
        ))}
      </Accordion>
    </>
  );
}
