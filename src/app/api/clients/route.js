import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - List all clients for the current user
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const clients = await sql`
      SELECT id, user_id, name, logo_url, brand_color, created_at
      FROM clients
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return Response.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return Response.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

// POST - Create a new client
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, logo_url, brand_color } = body;

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO clients (user_id, name, logo_url, brand_color)
      VALUES (
        ${userId},
        ${name},
        ${logo_url || null},
        ${brand_color || "#3B82F6"}
      )
      RETURNING id, user_id, name, logo_url, brand_color, created_at
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return Response.json({ error: "Failed to create client" }, { status: 500 });
  }
}
