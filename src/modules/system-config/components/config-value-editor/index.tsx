import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ConfigValueType } from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";

interface ConfigValueEditorProps {
  id: string;
  valueType: ConfigValueType;
  value: string;
  onChange: (value: string) => void;
  example?: unknown;
}

export function ConfigValueEditor({
  id,
  valueType,
  value,
  onChange,
  example,
}: ConfigValueEditorProps) {
  if (valueType === "number") {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>Value *</Label>
        <Input
          id={id}
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={example !== undefined ? String(example) : "0"}
          required
        />
      </div>
    );
  }

  if (valueType === "boolean") {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>Value *</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id}>
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">True</SelectItem>
            <SelectItem value="false">False</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (valueType === "string") {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>Value *</Label>
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={example !== undefined ? String(example) : ""}
          required
        />
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Value *</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        required
        className="font-mono text-sm"
      />
      <p className="text-muted-foreground text-xs">
        Enter valid JSON for this {valueType} configuration.
      </p>
    </div>
  );
}

interface ConfigExamplePreviewProps {
  example: unknown;
}

export function ConfigExamplePreview({ example }: ConfigExamplePreviewProps) {
  return (
    <div className="grid gap-2">
      <Label>Example</Label>
      <pre className="bg-muted max-h-48 overflow-auto rounded-md p-3 font-mono text-xs">
        {JSON.stringify(example, null, 2)}
      </pre>
    </div>
  );
}
