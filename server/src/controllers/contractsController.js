import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function getContracts(req, res) {
    try {
        const currentDate = new Date();

        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        const result = await prisma.contracts.findMany({
            where: {
                EmployeeId: +req.params.id,
                ContractExpiration: {
                    lte: req.query.nextYear ? nextYear : undefined,
                    gte: req.query.nextYear ? currentDate : undefined
                },
                ContractSign: {
                    lte: req.query.lastYear ? currentDate : undefined,
                    gte: req.query.lastYear ? lastYear : undefined
                }
            },
            include: {
                Employees: {
                    select: {
                        Name: true,
                        Surname: true,
                        Age: true,
                        Country: true,
                    }
                }
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }
}

async function getContract(req, res) {
    try {
        const result = await prisma.contracts.findUnique({
            where: {
                ContractId: +req.params.contractId
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
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }
}

async function postContract(req, res) {
    try {
        const { contractSign, contractExpiration, salaryPerMonth, salaryBonuses } = req.body;

        const documentId = await documentIdGenerator();

        const employee = await prisma.employees.findUnique({
            where: {
                Id: +req.params.id
            },
            select: {
                Name: true,
                Surname: true,
            }
        });

        const financeResult = await prisma.finances.create({
            data: {
                Description: `Salary for ${employee.Name} ${employee.Surname}`,
                Budget: -(+salaryPerMonth * 12 + +salaryBonuses),
                OperationDate: contractSign,
                OperationType: 3,
                DocumentId: documentId,
            }
        });

        const result = await prisma.contracts.create({
            data: {
                EmployeeId: +req.params.id,
                ContractId: documentId,
                ContractSign: contractSign,
                ContractExpiration: contractExpiration,
                SalaryPerMonth: +salaryPerMonth,
                SalaryBonuses: +salaryBonuses,
            }
        });

        res.status(201).json({ message: 'Contract was created successfully' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    res.status(400).json({ message: 'The contract\'s data of this employee exists! Try to change current contract' });
                    break;
                case 'P2003':
                    res.status(400).json({ message: 'The employee you entered doesn\'t exist! Try to choose another one' });
                    break;
                default:
                    res.status(500).json({ message: `Database server error. Try later\n${error.message}` });
                    break;
            }
        } else {
            res.status(500).json({ message: `The internal server error. Try later\n${error.message}` });
            console.error(error.message)
        }
    }
}

async function documentIdGenerator() {
    let documentId = Math.round(Math.random() * 1000000);

    const documentDB = await prisma.finances.findMany({
        select: {
            DocumentId: true,
        }
    });

    while (documentDB.find(element => element.ContractId === documentId)) {
        documentId = Math.round(Math.random() * 1000000);
    }

    return documentId;
}

async function updateContract(req, res) {
    try {
        const { contractSign, contractExpiration, salaryPerMonth, salaryBonuses } = req.body;

        const financeResult = await prisma.finances.update({
            where: {
                DocumentId: +req.params.contractId,
            },
            data: {
                Budget: -(+salaryPerMonth * 12 + +salaryBonuses),
                OperationDate: contractSign,
                DocumentId: +req.params.contractId,
            }
        });

        const result = await prisma.contracts.update({
            where: {
                ContractId: +req.params.contractId
            },
            data: {
                EmployeeId: +req.params.id,
                ContractId: +req.params.contractId,
                ContractSign: contractSign,
                ContractExpiration: contractExpiration,
                SalaryPerMonth: +salaryPerMonth,
                SalaryBonuses: +salaryBonuses,
            }
        });

        res.status(200).json({ message: 'Contract was updated successfully' });
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

async function deleteContract(req, res) {
    try {
        const financeDelete = prisma.finances.delete({
            where: {
                DocumentId: +req.params.contractId
            }
        });

        const contractDelete = prisma.contracts.delete({
            where: {
                ContractId: +req.params.contractId
            }
        });

        await prisma.$transaction([contractDelete, financeDelete]);
        res.status(200).json({ message: 'Contract was removed successfully' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2025':
                    res.status(404).json({ message: 'The contract you wanted to delete, doesn\'t exist!' });
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

export { getContracts, getContract, postContract, updateContract, deleteContract };