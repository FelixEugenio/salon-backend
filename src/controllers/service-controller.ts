import { ICreateServiceDto,IServiceResponseDto,IUpdateServiceDto } from "../dtos/service-dto";
import { ServiceService } from "../services/service-service";
import { Request,Response } from "express";

const serviceService = new ServiceService();
export class ServiceController {
  async create(req:Request,res:Response) {
    const serviceData:ICreateServiceDto = req.body;
    const service = await serviceService.create(serviceData);
    return res.status(201).json(service);
  }

  async getAll(req:Request,res:Response) {
    const services = await serviceService.getAll();
    return res.status(200).json(services);
  }

  async getById(req:Request,res:Response) {
    const id = req.params.id;
    const service = await serviceService.getById(id);
    return res.status(200).json(service);
  }

  async update(req:Request,res:Response) {
    const id = req.params.id;
    const serviceData:IUpdateServiceDto = req.body;
    const service = await serviceService.update(id,serviceData);
    return res.status(200).json(service);
  }

  async delete(req:Request,res:Response) {
    const id = req.params.id;
    const service = await serviceService.delete(id);
    return res.status(200).json(service);
  }
}