import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma"

export const onBoardUser = async () => {
    try {
        const user = await currentUser();
        // console.log(user);

        if (!user) {
            throw new Error("Unauthorized user")
        }

        const { id, firstName, lastName, emailAddresses, imageUrl } = user;

        const email = emailAddresses[0]?.emailAddress;

        if (!email) {
            throw new Error("Email not found")
        }

        const name = [firstName, lastName].filter(Boolean).join(" ") || null;

        const newUser = await prisma.user.upsert({
            where: { clerkUserId: id },
            update: { email, name, imageUrl },
            create: { clerkUserId: id, email, name, imageUrl }
        })

        return {
            success: true,
            user: newUser
        }
    } catch (error) {
        console.error("Onboarding error:", error);

        return {
            success: false,
            message: "Failed to onboard user",
        };
    }
}