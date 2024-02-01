'use server';

import { auth } from "@clerk/nextjs";
import { db } from '@/db/index';
import { chat } from '@/db/schema';

export async function create_chat() {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error();
        }

        const res = await db.insert(chat).values({ user_id, title: '' }).returning();

        return res[0];
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}
