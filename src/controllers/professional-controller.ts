import { Request,Response } from "express";
import { ProfessionalService } from "../services/professional-service";

const professionalService = new ProfessionalService();

export class ProfessionalController {
    async create(req:Request,res:Response) {
        const data = req.body;
        const professional = await professionalService.create(data);
        return res.status(201).json(professional);
    }

    async update(req:Request,res:Response) {
        const id = req.params.id;
        const data = req.body;
        const professional = await professionalService.update(id,data);
        return res.status(200).json(professional);
    }

    async delete(req:Request,res:Response) {
        const id = req.params.id;
        const professional = await professionalService.delete(id);
        return res.status(200).json(professional);
    }

    async getAll(req:Request,res:Response) {
        const professionals = await professionalService.getAll();
        return res.status(200).json(professionals);
    }

    async getById(req:Request,res:Response) {
        const id = req.params.id;
        const professional = await professionalService.getById(id);
        return res.status(200).json(professional);
    }

}