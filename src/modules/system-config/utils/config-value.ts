import type {
  ConfigCatalogItem,
  ConfigValueType,
} from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";

export function getEmptyConfigValue(valueType: ConfigValueType): unknown {
  switch (valueType) {
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    case "string":
      return "";
    default:
      return "";
  }
}

export function getInitialConfigValue(item: ConfigCatalogItem): unknown {
  if (item.configured) {
    return item.currentValue;
  }

  if (item.example !== undefined && item.example !== null) {
    return item.example;
  }

  return getEmptyConfigValue(item.valueType);
}

export function formatConfigValueForEditor(
  value: unknown,
  valueType: ConfigValueType,
): string {
  if (valueType === "number") {
    return value === undefined || value === null ? "" : String(value);
  }

  if (valueType === "boolean") {
    return String(Boolean(value));
  }

  if (valueType === "string") {
    return String(value ?? "");
  }

  return JSON.stringify(value ?? getEmptyConfigValue(valueType), null, 2);
}

export function parseConfigValueFromEditor(
  input: string,
  valueType: ConfigValueType,
): unknown {
  switch (valueType) {
    case "number": {
      const parsed = Number(input);
      if (input.trim() === "" || Number.isNaN(parsed)) {
        throw new Error("Enter a valid number.");
      }
      return parsed;
    }
    case "boolean":
      return input === "true";
    case "string":
      return input;
    case "array":
    case "object": {
      let parsed: unknown;
      try {
        parsed = JSON.parse(input);
      } catch {
        throw new Error("Enter valid JSON.");
      }

      if (valueType === "array" && !Array.isArray(parsed)) {
        throw new Error("Value must be a JSON array.");
      }

      if (
        valueType === "object" &&
        (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
      ) {
        throw new Error("Value must be a JSON object.");
      }

      return parsed;
    }
    default:
      return input;
  }
}

export function getValueTypeLabel(valueType: ConfigValueType): string {
  switch (valueType) {
    case "number":
      return "Number";
    case "array":
      return "Array";
    case "object":
      return "Object";
    case "string":
      return "String";
    case "boolean":
      return "Boolean";
    default:
      return valueType;
  }
}
