'use server';

import { auth } from "@clerk/nextjs";
import { db } from '@/db/index';
import { chat, messages } from '@/db/schema';
import { and, eq } from "drizzle-orm";

export async function create_chat(message: string) {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error();
        }

        const res = await db.insert(chat).values({ user_id, title: '' }).returning();
        await db
            .insert(messages)
            .values({ chat_id: res[0].id, sender: user_id, content: message });

        return res[0];
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function get_chats() {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error('user not auth');
        }

        return db
            .select()
            .from(chat)
            .where(eq(chat.user_id, user_id));

    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function get_all_messages(chatId: string) {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error('user not auth');
        }

        let res = await db
            .select()
            .from(chat)
            .where(and(eq(chat.id, chatId), eq(chat.user_id, user_id)))
            .limit(1);
        if (res.length == 0) {
            throw new Error('chat id not found');
        }

        return db.select()
            .from(messages)
            .where(eq(messages.chat_id, chatId));

    } catch (e: any) {
        console.log(e);
        throw e;
    }
}
