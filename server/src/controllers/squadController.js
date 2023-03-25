import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function getSquad(req, res) {
    try {
        const result = await prisma.squad.findMany({
            where: {
                Position: req.query.position,
                Employees: {
                    Country: req.query.country
                },
                Goals: {
                    lte: +(req.query.maxGoals ?? (await prisma.squad.aggregate({ _max: { Goals: true } }))._max.Goals),
                    gte: +(req.query.minGoals ?? (await prisma.squad.aggregate({ _min: { Goals: true } }))._min.Goals),
                },
                Assists: {
                    lte: +(req.query.maxAssists ?? (await prisma.squad.aggregate({ _max: { Assists: true } }))._max.Assists),
                    gte: +(req.query.minAssists ?? (await prisma.squad.aggregate({ _min: { Assists: true } }))._min.Assists)
                },
                Games: {
                    lte: +(req.query.maxGames ?? (await prisma.squad.aggregate({ _max: { Games: true } }))._max.Games),
                    gte: +(req.query.minGames ?? (await prisma.squad.aggregate({ _min: { Games: true } }))._min.Games)
                },
            },
            include: {
                Employees: {
                    select: {
                        Name: true,
                        Surname: true,
                        Country: true,
                        BirthDate: true,
                    }
                }
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'The resource you wanted was not found' });
    }

}

async function getFootballer(req, res) {
    const result = await prisma.squad.findUnique({
        where: {
            Id: +req.params.id,
        },

        include: {
            Employees: {
                select: {
                    Name: true,
                    Surname: true,
                    Age: true
                }
            }
        }
    });

    res.status(200).json(result);
}

async function postFootballer(req, res) {
    const { name, surname, position, shirtName, 
         age, birthdate, country } = req.body;

    const result = await prisma.squad.create({
        data: {
            Position: position,
            Games: 0,
            Goals: 0,
            Assists: 0,
            ShirtNumber: 0,
            ShirtName: shirtName,
            CleenSheets: 0,
            Employees: {
                create: {
                    Name: name,
                    Surname: surname,
                    Status: 'Footballer',
                    Age: +age,
                    BirthDate: birthdate,
                    Country: country,
                }
            }
        }
    });

    res.status(201).json({ message: 'Footballer was created successfully' });
}

async function updateFootballer(req, res) {
    try {
        const { name, surname, position, shirtNumber, shirtName, age, birthdate, country } = req.body;

        const result = await prisma.squad.update({
            where: {
                Id: +req.params.id
            },
            data: {
                Position: position,
                Games: {
                    increment: 1
                },
                Goals: {
                    increment: 1
                },
                Assists: {
                    increment: 1
                },
                ShirtNumber: +shirtNumber,
                ShirtName: shirtName,
                CleenSheets: {
                    increment: 1
                },
                Employees: {
                    update: {
                        Name: name,
                        Surname: surname,
                        Age: +age,
                        BirthDate: birthdate,
                        Country: country,
                    }
                }
            }
        });

        res.status(200).json({ message: 'Footballer was updated successfully' });
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

async function deleteFootballer(req, res) {
    try {
        const footballerDelete = prisma.squad.delete({
            where: {
                Id: +req.params.id
            }
        });

        const employeeDelete = prisma.employees.delete({
            where: {
                Id: +req.params.id
            }
        });

        await prisma.$transaction([footballerDelete, employeeDelete]);
        res.status(200).json({ message: 'Footballer was removed successfully' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2025':
                    res.status(404).json({ message: 'The footballer you wanted to delete, doesn\'t exist!' });
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

export { getSquad, postFootballer, updateFootballer, deleteFootballer, getFootballer };