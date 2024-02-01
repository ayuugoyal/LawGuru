'use server';

import { auth } from "@clerk/nextjs";
import { db } from '@/db/index';
import { Message, chat, messages } from '@/db/schema';
import { and, eq } from "drizzle-orm";

export async function create_chat(message: string) {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error();
        }

        const res = await db.insert(chat).values({ user_id, title: message }).returning();
        await db
            .insert(messages)
            .values({ chat_id: res[0].id, sender: user_id, content: message });

        const result = await fetch(process.env.AI_BACKEND_URL!, {
            method: 'POST',
            body: JSON.stringify({
                question: message,
            }),
        }).then((res) => res.json())
            .then((res) => res.answer.result);

        db.insert(messages)
            .values({ chat_id: res[0].id, sender: 'robot', content: result });

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

export async function get_chat(chatId: string) {
    try {
        const { userId: user_id } = auth();
        if (!user_id) {
            throw new Error();
        }

        const res = await db
            .select()
            .from(chat)
            .where(and(eq(chat.id, chatId), eq(chat.user_id, user_id)));

        if (res.length == 0) {
            throw new Error('Cannot find chat');
        }

        return res[0];
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export async function send_message(chatId: string, message: string): Promise<Message> {
    try {
        const res = await fetch(process.env.AI_BACKEND_URL!, {
            method: 'POST',
            body: JSON.stringify({
                question: message,
            }),
        }).then((res) => res.json());

        console.log(res);

        const result = res.answer.result;

        return db
            .insert(messages)
            .values({ chat_id: chatId, sender: 'robot', content: result })
            .returning()
            .then((res) => res[0])
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}
