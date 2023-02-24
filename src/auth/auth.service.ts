import prisma from '../libs/prisma'
import { type Prisma, type User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/// Returns the User if a user document exists with the provided email else returns null
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

/// Creates a user with the provided details and a hashed password
export const createUser = async (user: Prisma.UserCreateInput): Promise<User> => {
  // Generates a salt to hash the password and hashes it
  const salt = bcrypt.genSaltSync(12)
  user.password = bcrypt.hashSync(user.password, salt)

  // Creates a user using prisma in the database
  return await prisma.user.create({
    data: user
  })
}

/// Generates and returns a JWT which contains users id
export const generateJWT = (id: string): string => {
  if (process.env.JWT_SECRET === undefined) {
    // Throws an error if there is no JWT_SECRET in the environment variable
    throw Error('JWT_SECRET is undefined')
  } else {
    // If there is a JWT_SECRET then returns a JWT containing id of the user
    return jwt.sign(id, process.env.JWT_SECRET)
  }
}

/// Compares the given password and the user's encrypted password from the database and returns a boolean
export const comparePasswords = (input: string, encrypted: string): boolean => {
  return bcrypt.compareSync(input, encrypted)
}
