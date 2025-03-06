import type { Event } from "../models/event";
import * as repo from "../repository/eventRepositoryPrisma";

export function getEventByCategory(category: string) {
  return repo.getEventByCategory(category);
}

export function getAllEvents() {
  return repo.getAllEventsWithOrganizer();
}

export function getEventById(id: number) {
  return repo.getEventById(id);
}

export function addEvent(newEvent: Event) {
  return repo.addEvent(newEvent);
}

export function getAllEventsWithOrganizerPagination(page: number, pageSize: number) {
  return repo.getAllEventsWithOrganizerPagination(page, pageSize);
}

export function count() {
  return repo.countEvents();
}