import { Metadata, ResolvingMetadata } from "next";
import { getEventBySlug, getEventIssues } from "@/lib/supabase/services";
import { notFound } from "next/navigation";
import ReadingOrderPage from "./client-page";

type NextPageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Helper function to safely get a single string
const getSingleStringParam = (param?: string | string[], defaultValue = "5"): string => {
  if (!param) return defaultValue;
  return Array.isArray(param) ? param[0] : param;
};

export async function generateMetadata(
  { params, searchParams }: NextPageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const timeline = getSingleStringParam(searchParams.timeline);

  const event = await getEventBySlug(slug, timeline).catch(() => null);
  if (!event) return { title: "Not Found" };

  return {
    title: `${event.title} Reading Order | Reading Orders`,
    description: event.description,
  };
}

export default async function Page({ params, searchParams }: NextPageProps) {
  const slug = params.slug;
  const timeline = getSingleStringParam(searchParams.timeline);

  const event = await getEventBySlug(slug, timeline).catch(() => null);
  if (!event) notFound();

  const issues = await getEventIssues(event.id);

  return <ReadingOrderPage event={event} issues={issues} timeline={event.current_timeline} />;
}