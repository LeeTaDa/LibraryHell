import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface UserProfileProps {
  user: {
    id: number;
    username: string;
    name?: string;
    email: string;
    enabled: boolean;
    phoneNumber: string | null;
    roles: string[];
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>Username</Label>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="space-y-1">
          <Label>Phone Number</Label>
          <p className="text-sm text-muted-foreground">
            {user.phoneNumber || "Not provided"}
          </p>
        </div>
        <div className="space-y-1">
          <Label>Account Status</Label>
          <p className="text-sm">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              user.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {user.enabled ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
        <div className="space-y-1">
          <Label>Roles</Label>
          <div className="flex gap-2">
            {user.roles.map((role) => (
              <span
                key={role}
                className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

