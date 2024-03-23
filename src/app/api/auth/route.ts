export async function POST(request: Request) {
  const res = await request.json();
  if (!res.accessToken && !res.refreshToken) {
    return Response.json(
      { message: "Không nhận được access token và refresh token" },
      { status: 400 }
    );
  }

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `accessToken=${res.accessToken}; HttpOnly; Path=/; Secure`
  );

  if (res.refreshToken) {
    headers.append(
      "Set-Cookie",
      `refreshToken=${res.refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`
    );
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers,
    }
  );
}
