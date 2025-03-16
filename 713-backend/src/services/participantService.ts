import exp from "constants";
import * as repo from "../repository/participantRepositoryPrisma";

export function getAllParticipants() {
    return repo.getAllParticipants();
}

export function getParticipantById(id: number) {
    return repo.getParticipantById(id);
}

export async function getAllParticipantswithEventsPagination(pageSize: number, pageNo: number) {
    const pageParticipant = await repo.getAllParticipantsWithEventsPagination(pageSize, pageNo);
    return pageParticipant; 
}