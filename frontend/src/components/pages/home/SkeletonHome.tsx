import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonHome() {
  return (
    <main className="w-full max-w-6xl flex flex-col my-10 md:my-14 mx-6">
      <div className="w-full flex justify-between items-center">
        <Skeleton
          className="h-16 md:h-14 max-w-2xl w-full mb-6"
        />
      </div>
      <div className="flex flex-col w-full gap-8">
        {Array.from({ length: 10 }).map(() => (
          <section className="w-full" key={crypto.randomUUID()}>
            <div className="flex items-center w-full gap-2">
              <Skeleton className="h-10 w-96 my-4" />
            </div>
            <div className="flex w-full flex-col gap-6">
              <Skeleton className="w-full max-w-2xl h-6" />
              <Skeleton className="w-full max-w-2xl h-6" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
