import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();

    const searchParams = useSearchParams()
    const origin = searchParams.get("origin");


    const{data, isLoading, error} = trpc.authCallback.useQuery()

    useEffect(() => {
        if (data && data.success) {
            router.push(origin ? `/${origin}` : `/dashboard`);
        }
        else if(error?.data?.code === "UNAUTHORIZED") {
            router.push(`/sign-in`)
        }
    }, [data, origin, router]);
    
}


export default Page;