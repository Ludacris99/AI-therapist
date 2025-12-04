"use client";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
    const router = useRouter();

    function createChat() {
        const id = crypto.randomUUID();
        router.push(`/chat/${id}`);
    }

    return (
        <button
            onClick={createChat}
            className="h-full w-full p-20 max-md:p-10 flex items-center justify-center gap-2 text-4xl max-md:text-2xl font-semibold cursor-pointer"
        >
            <span><img src="/message.svg" alt="message" height={50} width={50} /></span>
            Start Therapy
        </button>
    );
}
