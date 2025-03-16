import { PrismaClient } from "@prisma/client";
import type { PageParticipant } from "../models/participant";

const prisma = new PrismaClient();

export function getAllParticipants() {
    return prisma.participant.findMany();
}

export function getParticipantById(id: number) {
    return prisma.participant.findUnique({
        where: { id }
    });
}

export async function getAllParticipantsWithEventsPagination(pageSize: number, pageNo: number) {
    const participants = await prisma.participant.findMany({
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
        include: {
            events: {
                select: {
                    title: true,
                    description: true,
                    date: true
                }
            }
        }
    });

    const count = await prisma.participant.count();
    return { count, participants } as PageParticipant;
}