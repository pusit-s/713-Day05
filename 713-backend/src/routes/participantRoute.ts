import express, { Request, Response } from "express";
import * as service from "../services/participantService";

const router = express.Router();

router.get("/", async(req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;

    try {
        const result = await service.getAllParticipantswithEventsPagination(pageSize, pageNo);
        if (result.participants.length === 0) {
            res.status(404).send("No Participant found");
            return;
        } 
        res.setHeader("x-total-count", result.count.toString());
        res.setHeader("Access-Control-Expose-Headers", "x-total-count");
        res.json(result.participants);
    } catch (error) {
        if (pageNo < 1 || pageSize < 1) {
        res.status(400).send("Invalid page number or page size");
        } else {
            console.log(error);
        res.status(500).send("Internal Server Error");}
    } finally {
        console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
    }
    return;
});

router.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await service.getParticipantById(id);
        if (result === null) {
            res.status(404).send("Participant not found");
            return;
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    } finally {
        console.log(`Request is completed. with id=${id}`);
    }
    return;
});

export default router;