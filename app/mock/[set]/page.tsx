import { notFound } from "next/navigation";
import { mockBySet } from "@/lib/content";
import TestRunner from "@/components/TestRunner";

export default async function MockSetPage({
  params,
}: {
  params: Promise<{ set: string }>;
}) {
  const { set } = await params;
  const setName = decodeURIComponent(set);
  const questions = mockBySet[setName];

  if (!questions || questions.length === 0) notFound();

  return <TestRunner setName={setName} questions={questions} />;
}
