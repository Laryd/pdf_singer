"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { useEffect } from "react";
import { Loader2 } from "lucide-react";


const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { isSuccess, isError, error, refetch } = trpc.authCallback.useQuery(undefined);

  // useEffect to trigger a retry when the error changes
  useEffect(() => {
    if (isError) {
      error.data?.code === "UNAUTHORIZED" && router.push("/sign-in");

      // Retry the query after a delay (optional)
      const retryTimeout = setTimeout(() => {
        refetch();
      }, 3000); // Retry after 3 seconds, adjust as needed

      // Clean up the timeout if the component unmounts or the error changes
      return () => clearTimeout(retryTimeout);
    }
    // Check for success directly in the component body
    if (isSuccess) {
      // user is synced to the database
      router.push(origin ? `/${origin}` : "/dashboard");
    }
  }, [error, refetch, isSuccess, isError, origin, router]);

  

  return (
    <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-800"/>
            <h3 className="font-semibold text-xl">Setting up your account...</h3>
            <p>You will be redirected automatically.</p>
        </div>
    </div>
  )
}

export default Page