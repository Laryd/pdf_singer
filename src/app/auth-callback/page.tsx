import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"


const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined);
  // Check for success directly in the component body
  if (data?.success) {
    // user is synced to the database
    router.push(origin ? `/${origin}` : "/dashboard");
  }
  return <div>page</div>;
}

export default Page