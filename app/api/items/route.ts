import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export const POST = async(request : Request) => {
    const items = await request.json();

    const supabase = createRouteHandlerClient({cookies});

   // const { data: {session} } = supabase.auth.getSession();

    const { data, error } = await supabase.from('Orders')
    .insert([
        ...items,
    ]
    ).select()

    return Response.json({ data, error, items });
}