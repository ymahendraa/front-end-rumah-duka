import LoadingKalla from "@/components/atoms/loading";

export default function Loading() {
    return (
        <main>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center">
                    <LoadingKalla width={50} height={50} />
                </div>
            </div>
        </main>
    );
}