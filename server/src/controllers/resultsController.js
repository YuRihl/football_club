import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function getResults(req, res){
    try {
        const result = await prisma.results.findMany({
            select: {
                Tournament: true,
                Place: true,
                Income: true,
                TelevisionRights: true,
                StartPrize: true,
                ResultPrize: true
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }
}

async function getResult(req, res){
    try {
        const result = await prisma.results.findMany({
            where: {
                Tournament: req.params.tournament
            },
            select: {
                Tournament: true,
                Place: true,
                Income: true,
                TelevisionRights: true,
                StartPrize: true,
                ResultPrize: true
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }
}

async function postResult(req, res){
    try {
        
    } catch (error) {
        
    }
}

async function updateResult(req, res){

}

async function deleteResult(req, res){

}

export { getResults, getResult, postResult, updateResult, deleteResult };