import { notFound } from "next/navigation";
import BottomSheet from "@/components/BottomSheet";
import CollectionView from "@/components/CollectionView";
import { getCollection, getCollectionProjects } from "@/lib/projects";

/* In-app clicks on a folder land here and open it as a sheet over the
   current page. Direct visits render app/work/[collection]. */
export default async function CollectionSheet({
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
    <BottomSheet title={collection.title}>
      <CollectionView
        collection={collection}
        projects={getCollectionProjects(collection.slug)}
        compact
      />
    </BottomSheet>
  );
}
