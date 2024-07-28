import { Prisma, Report } from '@prisma/client';


export interface ReportServices{
    createReport(data: Prisma.UserCreateInput): Promise<Report>
}