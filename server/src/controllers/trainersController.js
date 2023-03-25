import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function getTrainers(req, res) {
    try {
        const result = await prisma.trainers.findMany({
            where: {
                Type: req.query.type,
                Employees: {
                    Country: req.query.country
                }
            },
            include: {
                Employees: {
                    select: {
                        BirthDate: true,
                        Country: true
                    }
                }
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }
}

async function getTrainer(req, res) {
    const result = await prisma.trainers.findUnique({
        where: {
            Id: +req.params.id
        },
        include: {
            Employees: {
                select: {
                    BirthDate: true,
                    Country: true
                }
            }
        }
    });

    res.status(200).json(result);
}

async function postTrainer(req, res) {
    const { name, surname, age, type, birthdate, country } = req.body;

    const employeeResult = await prisma.employees.create({
        data: {
            Name: name,
            Surname: surname,
            Status: 'Trainer',
            Age: +age,
            BirthDate: birthdate,
            Country: country,

        }
    });

    const maxEmployeeId = await prisma.employees.aggregate({
        _max: {
            Id: true,
        }
    });

    const result = await prisma.trainers.create({
        data: {
            Name: name,
            Surname: surname,
            Age: +age,
            Type: type,
            Id: maxEmployeeId,
        }
    });

    res.status(201).json({ message: 'Trainer was created successfully' });
}

async function updateTrainer(req, res) {
    try {
        const { name, surname, age, type, birthdate, country } = req.body;

        const result = await prisma.trainers.update({
            where: {
                Id: +req.params.id
            },
            data: {
                Name: name,
                Surname: surname,
                Age: +age,
                Type: type,
                Employees: {
                    update: {
                        Name: name,
                        Surname: surname,
                        Status: 'Trainer',
                        Age: +age,
                        BirthDate: birthdate,
                        Country: country
                    }
                }
            }
        });

        res.status(200).json({ message: 'Trainer was updated successfully' });
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

async function deleteTrainer(req, res) {
    try {
        const trainerDelete = prisma.trainers.delete({
            where: {
                Id: +req.params.id
            }
        });

        const employeeDelete = prisma.employees.delete({
            where: {
                Id: +req.params.id
            }
        });

        await prisma.$transaction([trainerDelete, employeeDelete]);
        res.status(200).json({ message: 'Trainer was removed successfully' })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2025':
                    res.status(404).json({ message: 'The trainer you wanted to delete, doesn\'t exist!' });
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

export { getTrainers, getTrainer, postTrainer, updateTrainer, deleteTrainer };