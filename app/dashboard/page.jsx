import DashboardClient from "../../components/DashboardClient";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // Read session cookie server-side and fetch username
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session-cookie")?.value;

    if (!sessionId) {
        redirect("/login");
    }

    await connectDB();

    const session = await Session.findById(sessionId);
    if (!session || new Date(session.expiresAt) < new Date()) {
        redirect("/login");
    }

    const user = await User.findById(session.userId).select("username");
    const username = user?.username || "User";

    return <DashboardClient username={username} />;
}
