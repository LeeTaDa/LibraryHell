'use server'

import { hash } from "bcryptjs"
import { z } from "zod"

const PasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function updatePassword(prevState: any, formData: FormData) {
  const validatedFields = PasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to update password.",
    }
  }

  try {
    const hashedPassword = await hash(validatedFields.data.newPassword, 10)
    
    // Here you would update the password in your database
    // await axios.post.user.update({ 
    //   where: { id: userId },
    //   data: { password: hashedPassword }
    // })

    return {
      message: "Password updated successfully.",
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to update password.",
    }
  }
}

