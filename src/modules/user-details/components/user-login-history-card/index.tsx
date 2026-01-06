import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield } from "lucide-react";

interface LoginRecord {
  id: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location?: string;
  status: "SUCCESS" | "FAILED";
}

interface UserLoginHistoryCardProps {
  loginHistory?: LoginRecord[];
}

export default function UserLoginHistoryCard({
  loginHistory,
}: UserLoginHistoryCardProps) {
  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Login History & Security</CardTitle>
      </CardHeader>
      <CardContent>
        {loginHistory && loginHistory.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.slice(0, 10).map((login) => (
                <TableRow key={login.id}>
                  <TableCell>
                    {new Date(login.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono">{login.ipAddress}</TableCell>
                  <TableCell>{login.device}</TableCell>
                  <TableCell>{login.location || "Unknown"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        login.status === "SUCCESS" ? "info" : "destructive"
                      }
                    >
                      {login.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={Shield}
            title="No Login History"
            description="No login attempts have been recorded for this user yet."
            className="border-0 py-12"
          />
        )}
      </CardContent>
    </Card>
  );
}
