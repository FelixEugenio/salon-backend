import { ICreateServiceDto,IServiceResponseDto,IUpdateServiceDto } from "../dtos/service-dto";
import { ServiceService } from "../services/service-service";
import { Request,Response } from "express";
import { uploadServiceImage } from "../utils/cloudinary/cloudinary";

const serviceService = new ServiceService();
export class ServiceController {
  async create(req:Request,res:Response) {
    const file = req.file;
    console.log(file);
    const serviceData:ICreateServiceDto = req.body;

    if(file) {
      const imageUrl = await uploadServiceImage(file.path);
      serviceData.img = imageUrl;
    }
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
    const file = req.file;
    const serviceData:IUpdateServiceDto = req.body;
    if(file) {
      const imageUrl = await uploadServiceImage(file.path);
      serviceData.img = imageUrl;
    }
    const service = await serviceService.update(id,serviceData);
    return res.status(200).json(service);
  }

  async delete(req:Request,res:Response) {
    const id = req.params.id;
    const service = await serviceService.delete(id);
    return res.status(200).json(service);
  }
}