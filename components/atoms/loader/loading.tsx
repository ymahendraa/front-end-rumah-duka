import LoadingKalla from "@/components/atoms/loading";
import loading from '@/public/rings.svg'

export default function Loading() {
    return (
        <main>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center">
                    <img src='./rings.svg' alt="loader" />
                </div>
            </div>
        </main>
    );
}