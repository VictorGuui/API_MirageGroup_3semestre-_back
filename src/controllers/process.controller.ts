import { DataSource, Repository } from "typeorm"
import appDataSource from "../infra/data-source"
import Process from "../infra/entities/process.entity"
import ProcessServices from '../services/process.services'

export default class ProcessController{

    public constructor(
        private readonly processServices: ProcessServices
    ){}
    
    public async createProcess(req: any, res: any) {
        const { name, description, date_created, date_finish } = req.body
        if( name == null || description == null || date_created == null || date_finish == null) return res.status(400).send({ message: "Missing process information" })
        try{
            const process: Process = await this.processServices.createProcess(req.body)
            res.status(201).send(process)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }
}