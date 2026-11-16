import "server-only";

interface ErpConfig {
  url: string;
  apiKey: string;
  apiSecret: string;
}

export class ErpError extends Error {
  constructor(
    public code: string,
    public details: any,
    message?: string,
  ) {
    super(message || code);
    this.name = "ErpError";
  }
}

function getErpConfig(): ErpConfig {
  const url = process.env.NEXT_PUBLIC_ERP_URL;
  const apiKey = process.env.ERP_API_KEY;
  const apiSecret = process.env.ERP_API_SECRET;

  if (!url || !apiKey || !apiSecret) {
    throw new Error("ERPNext configuration missing: NEXT_PUBLIC_ERP_URL, ERP_API_KEY, ERP_API_SECRET");
  }

  return { url, apiKey, apiSecret };
}

function parseErpMessage(message: string): string {
  try {
    const parts = message.split("\n");
    return parts[parts.length - 1] || message;
  } catch {
    return message;
  }
}

export async function erpFetch<T>(
  method: string,
  endpoint: string,
  body?: Record<string, any>,
): Promise<T> {
  const config = getErpConfig();
  const url = `${config.url}/api/resource/${endpoint}`;

  const headers: HeadersInit = {
    Authorization: `token ${config.apiKey}:${config.apiSecret}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.message || data.exc || "Unknown error";
    throw new ErpError(
      data.code || "ERR_REQUEST_FAILED",
      data,
      parseErpMessage(errorMessage),
    );
  }

  return data.data || data;
}

export async function listDocs<T>(
  doctype: string,
  options?: {
    fields?: string[];
    filters?: any[];
    limit?: number;
    offset?: number;
    orderBy?: string;
  },
): Promise<T[]> {
  const params = new URLSearchParams();
  if (options?.fields?.length) {
    params.append("fields", JSON.stringify(options.fields));
  }
  if (options?.filters?.length) {
    params.append("filters", JSON.stringify(options.filters));
  }
  if (options?.limit) {
    params.append("limit_page_length", options.limit.toString());
  }
  if (options?.offset) {
    params.append("limit_page_length_start", options.offset.toString());
  }
  if (options?.orderBy) {
    params.append("order_by", options.orderBy);
  }

  const config = getErpConfig();
  const url = `${config.url}/api/resource/${doctype}?${params.toString()}`;

  const headers: HeadersInit = {
    Authorization: `token ${config.apiKey}:${config.apiSecret}`,
    Accept: "application/json",
  };

  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok) {
    throw new ErpError(data.code || "ERR_REQUEST_FAILED", data, data.message);
  }

  return data.data || [];
}

export async function getDoc<T>(doctype: string, name: string): Promise<T> {
  const config = getErpConfig();
  const url = `${config.url}/api/resource/${doctype}/${name}`;

  const headers: HeadersInit = {
    Authorization: `token ${config.apiKey}:${config.apiSecret}`,
    Accept: "application/json",
  };

  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok) {
    throw new ErpError(data.code || "ERR_NOT_FOUND", data, data.message);
  }

  return data.data;
}

export async function createDoc<T>(doctype: string, data: Record<string, any>): Promise<T> {
  return erpFetch<T>("POST", doctype, data);
}

export async function updateDoc<T>(doctype: string, name: string, data: Record<string, any>): Promise<T> {
  return erpFetch<T>("PUT", `${doctype}/${name}`, data);
}

export async function callMethod(
  method: string,
  args?: Record<string, any>,
): Promise<any> {
  const config = getErpConfig();
  const url = `${config.url}/api/method/${method}`;

  const headers: HeadersInit = {
    Authorization: `token ${config.apiKey}:${config.apiSecret}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: args ? JSON.stringify(args) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ErpError(data.code || "ERR_METHOD_FAILED", data, data.message);
  }

  return data.message || data;
}
