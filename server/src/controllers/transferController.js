import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function getTransfer(req, res) {
    try {
        let employeeStatus;

        if (req.baseUrl === '/trainers') employeeStatus = 'Trainer'

        if (req.baseUrl === '/squad') employeeStatus = 'Footballer'

        const result = await prisma.transfers.findMany({
            where: {
                Id: +req.params.id,
                Employees: {
                    Status: employeeStatus
                }
            },
            include: {
                Employees: {
                    select: {
                        Name: true,
                        Surname: true,
                    }
                }
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: `The resource you wanted was not found, ${error.message}` });
    }
}

async function postTransfer(req, res) {
    try {
        const { transferDate, signedFrom, transferSum } = req.body;

        const result = await prisma.transfers.create({
            data: {
                Id: +req.params.id,
                TransferDate: transferDate,
                SignedFrom: signedFrom,
                TransferSum: +transferSum,
            }
        });

        res.status(201).json({ message: 'Transfer was created successfully' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    res.status(400).json({ message: 'The transfer data from this footballer exists! Try to change current transfer' });
                    break;
                case 'P2003':
                    res.status(400).json({ message: 'The employee you entered doesn\'t exist! Try to choose another one' });
                    break;
                default:
                    res.status(500).json({ message: `Database error. Try later. Error: ${error.message}` });
                    break;
            }
        } else {
            res.status(500).json({ message: `The internal server error. Try later. Error: ${error.message}` });
            console.error(error.message)
        }
    }
}

async function updateTransfer(req, res) {
    try {
        const { transferDate, signedFrom, transferSum } = req.body;
        
        const result = prisma.transfers.update({
            where: {
                Id: +req.params.id
            },
            data: {
                Id: +req.params.id,
                TransferDate: transferDate,
                SignedFrom: signedFrom,
                TransferSum: +transferSum,
            }
        });

        res.status(200).json({ message: 'Transfer was updated successfully' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2009':
                    res.status(404).json({ message: 'You didn\'t pass anough fields' });
                    break;
                default:
                    res.status(500).json({ message: `Database error. Try later. Error: ${error.message}` });
                    break;
            }
        } else {
            res.status(500).json({ message: `The internal server error. Try later. Error: ${error.message}` });
            console.error(error.message)
        }
    }
}

async function deleteTransfer(req, res) {
    try {
        const transferDelete = await prisma.transfers.delete({
            where: {
                Id: +req.params.id
            }
        });

        res.status(200).json({ message: 'Transfer was removed successfully' })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2025':
                    res.status(404).json({ message: 'The transfer you wanted to delete, doesn\'t exist!' });
                    break;
                default:
                    res.status(500).json({ message: `Database error. Try later. Error: ${error.message}` });
                    break;
            }
        } else {
            res.status(500).json({ message: `The internal server error. Try later. Error: ${error.message}` });
            console.error(error.message)
        }
    }
}

export { getTransfer, postTransfer, updateTransfer, deleteTransfer };