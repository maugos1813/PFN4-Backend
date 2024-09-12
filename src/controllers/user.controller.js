import { createUser, deleteUser, getAllUsers, getUserById, partialUpdateUser, updateUser } from '../models/models.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error })
  }
}

// export const createUserController = async (req, res) => {
//   try {
//     const newUser = await createUser(req.body)
//     res.status(201).json(newUser)
//   } catch (error) {
//     res.status(500).json({ message: 'Error al crear el usuario', error })
//   }
// }

export const createUserController = async (req, res) => {
  try {
    const { contraseña, ...userData } = req.body

    if (!contraseña) {
      return res.status(400).json({ message: 'La contraseña es requerida' })
    }

    const hashedPassword = await bcrypt.hash(contraseña, SALT_ROUNDS)

    const newUser = await createUser({ ...userData, contraseña: hashedPassword })

    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message })
  }
}

export const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body)
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error })
  }
}

export const partialUpdateUserController = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: 'No se han proporcionado datos para actualizar' })
    }

    const result = await partialUpdateUser(id, updates)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({ message: 'Usuario actualizado parcialmente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error })
  }
}

export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id)
    res.json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error })
  }
}
