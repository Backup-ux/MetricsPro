import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get total clients count
    const clientsResult = await sql`
      SELECT COUNT(*) as count FROM clients WHERE user_id = ${userId}
    `;
    const totalClients = parseInt(clientsResult[0].count);

    // Get total reports count (join through clients table since reports don't have user_id)
    const reportsResult = await sql`
      SELECT COUNT(*) as count 
      FROM reports r
      JOIN clients c ON r.client_id = c.id
      WHERE c.user_id = ${userId}
    `;
    const totalReports = parseInt(reportsResult[0].count);

    // Get recent reports with client names
    const recentReports = await sql`
      SELECT 
        r.id,
        r.period as title,
        r.created_at,
        c.name as client_name
      FROM reports r
      JOIN clients c ON r.client_id = c.id
      WHERE c.user_id = ${userId}
      ORDER BY r.created_at DESC
      LIMIT 5
    `;

    return Response.json({
      totalClients,
      totalReports,
      recentReports,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return Response.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
