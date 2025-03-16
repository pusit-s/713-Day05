import * as repo from "../repository/participantRepositoryPrisma";

export function getAllParticipants() {
    return repo.getAllParticipants();
}

export async function getAllParticipantswithEventsPagination(pageSize: number, pageNo: number) {
    const pageParticipant = await repo.getAllParticipantsWithEventsPagination(pageSize, pageNo);
    return pageParticipant; 
}