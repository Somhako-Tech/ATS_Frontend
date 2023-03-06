import Head from "next/head";
import Orgsidebar from "@/components/organisation/sidebar";
import Orgtopbar from "@/components/organisation/topbar";

export default function Dashboard () {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
            <main>
                <Orgsidebar />
                <Orgtopbar />
                <div className="py-8">
                    Dashboard
                </div>
            </main>
        </>
    )
}