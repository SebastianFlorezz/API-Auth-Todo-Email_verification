const { z } = require("zod");

const UserSchema = z.object({
    username: z.string().regex(/^[A-Za-z0-9]([._-]?[A-Za-z0-9]+)*$/,),
    email: z.email(),
    password: z.string().regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "Password must contain at least one uppercase letter, one number and 8 characters"),

});




module.exports = UserSchema;