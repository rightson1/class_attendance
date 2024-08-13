export function eRes(message: string, status: number = 400): Response {
  return new Response(JSON.stringify({ message }), { status });
}

export function errorResponse({
  message,
  status = 400,
}: {
  message: string;
  status?: number;
}): Response {
  return new Response(JSON.stringify({ message }), { status });
}
