const { PrismaClient } = require("../generated/prisma")
const prisma = new PrismaClient()
const { databaseError, missingFieldsError } = require("../utils/errorResponses")


const verifyMailToken = async (req, res) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                verifyToken: req.params.token,
                verifyExpires: { gt: new Date() }
            }
        })

        if (!existingUser) {
            return res.status(400).json(missingFieldsError("Invalid or expired token"));
        }

        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                isEmailVerified: true,
                verifyToken: null,
                verifyExpires: null,
            }
        })

        return res.status(200).json({ msg: 'Ya se verifico esa vaina' })

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json(databaseError(error));
    }
}

module.exports = verifyMailToken