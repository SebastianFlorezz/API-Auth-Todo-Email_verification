const { PrismaClient } = require("../../generated/prisma");
const { databaseError } = require("../../utils/errorResponses.js");
const prisma = new PrismaClient();

const getTaskController = async (req, res) => {
    try {
        const userId = req.user.id;

        const tasks = await prisma.tasks.findMany({
            where: {
                userId: userId
            }
        });

        const formattedTasks = tasks.map(task => ({
            type: "tasks",
            id: task.id.toString(),
            attributes: {
                title: task.title,
                description: task.description,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
            },
            relationships: {
                user: {
                    data: {
                        type: "users",
                        id: task.userId.toString()
                    },
                    links: {
                        related: `/api/users/${task.userId}`
                    }
                }
            },
            links: {
                self: `/api/tasks/${task.id}`
            }
        }));

        return res.status(200).json({
            data: formattedTasks
        });

    } catch (error) {
        console.error("Getting tasks error", error);
        return res.status(500).json(databaseError(error));
    }
};

module.exports = getTaskController;
