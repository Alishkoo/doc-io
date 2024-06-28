import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const searchParams = useSearchParams()
    const origin = searchParams.get("origin");

    
}


export default Page;