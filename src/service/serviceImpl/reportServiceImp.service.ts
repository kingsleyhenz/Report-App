import { Prisma, Report } from '@prisma/client';
import { ReportServices } from './../reportService.service';

export class ReportImplementation implements ReportServices{
    createReport(data: Prisma.UserCreateInput): Promise<{ id: number; title: string; content: string; published: boolean; createdAt: Date; updatedAt: Date; userId: number; }> {
        throw new Error('Method not implemented.');
    }
    

}