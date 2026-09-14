import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { HubStatus, PrintHub } from "@/lib/hooks/admin/use-get-all-hubs";
import {
  formatStatusText,
  formatToMDY,
  getHubStatusBadgeVariant,
  getHubStatusIconKey,
} from "@/lib/utils";
import { AlertCircle, Check, Clock, X } from "lucide-react";
import { useRouter } from "next/navigation";

const hubStatusIcons = {
  pending: <Clock className="size-3" />,
  approved: <Check className="size-3" />,
  rejected: <X className="size-3" />,
  action_required: <AlertCircle className="size-3" />,
};

export function PrintHubMobileCard({ printHub }: { printHub: PrintHub }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/print-hubs/${printHub.id}`)}
      className="hover:bg-muted/50 w-full space-y-3 border-b p-4 text-left transition-colors last:border-b-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{printHub.businessName}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {formatToMDY(printHub.createdAt)}
          </p>
        </div>
        <Badge
          variant={getHubStatusBadgeVariant(printHub.status as HubStatus)}
          className="shrink-0"
        >
          {hubStatusIcons[getHubStatusIconKey(printHub.status as HubStatus)]}
          {formatStatusText(printHub.status)}
        </Badge>
      </div>
      <p className="text-muted-foreground text-sm wrap-break-word">
        {printHub.businessAddress}
      </p>
      <p className="text-muted-foreground truncate text-xs">
        {printHub.businessEmail}
      </p>
    </button>
  );
}

function PrintHubTableRow({ printHub }: { printHub: PrintHub }) {
  const router = useRouter();

  const handleClick = () => router.push(`/print-hubs/${printHub.id}`);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <TableRow
      className="hover:bg-muted/50 cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <TableCell className="px-5 py-4 font-mono text-sm">
        {printHub.businessName}
      </TableCell>
      <TableCell className="text-muted-foreground py-4">
        {printHub.businessAddress}
      </TableCell>
      <TableCell className="px-5 py-4">
        {formatToMDY(printHub.createdAt)}
      </TableCell>
      <TableCell className="px-5 py-4">{printHub.businessEmail}</TableCell>
      <TableCell className="px-5 py-4">
        <Badge variant={getHubStatusBadgeVariant(printHub.status as HubStatus)}>
          {hubStatusIcons[getHubStatusIconKey(printHub.status as HubStatus)]}
          {formatStatusText(printHub.status)}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export default PrintHubTableRow;
