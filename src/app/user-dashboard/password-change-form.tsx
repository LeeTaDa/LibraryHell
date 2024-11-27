'use client'

import { useFormState } from "react-dom"
import { updatePassword } from "../action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const initialState = {
  message: null,
  errors: {}
}

export function PasswordChangeForm() {
  const [state, formAction] = useFormState(updatePassword, initialState)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password by entering your current password and a new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
            />
            {state?.errors?.currentPassword && (
              <p className="text-sm text-red-500">{state.errors.currentPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
            />
            {state?.errors?.newPassword && (
              <p className="text-sm text-red-500">{state.errors.newPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
            {state?.errors?.confirmPassword && (
              <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>
            )}
          </div>
          {state?.message && (
            <p className={`text-sm ${
              state.errors ? "text-red-500" : "text-green-500"
            }`}>
              {state.message}
            </p>
          )}
          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

