'use server';

import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs";
import { db } from '@/db/index';
import { chat } from '@/db/schema';

export async function POST() {
    const { userId: user_id } = auth();
    if (!user_id) {
        return new Response('Unauthrized', { status: 401 });
    }

    const res = await db.insert(chat).values({ user_id, title: '' }).returning();

    return NextResponse.json({ data: res[0] });
}
