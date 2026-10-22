import { notFound } from "next/navigation";
import CollectionView from "@/components/CollectionView";
import PageWrapper from "@/components/PageWrapper";
import PillLink from "@/components/PillLink";
import { collections, getCollection, getCollectionProjects } from "@/lib/projects";

export function generateStaticParams() {
  return collections.map((collection) => ({ collection: collection.slug }));
}

/* Full page, used on direct visits and refreshes. In-app clicks on a folder
   open the same content in a folder sheet instead (see app/@modal). */
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <PageWrapper className="pt-6 sm:pt-10">
      <PillLink href="/">← Home</PillLink>
      <CollectionView collection={collection} projects={getCollectionProjects(collection.slug)} />
    </PageWrapper>
  );
}
