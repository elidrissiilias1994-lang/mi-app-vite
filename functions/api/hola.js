export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    return new Response(JSON.stringify({
        message: "Hola desde una Cloudflare Function!",
        timestamp: new Date().toISOString(),
        path: url.pathname,
        serverless: true
    }), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
    });
}
