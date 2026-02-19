import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CAKTO_SECRET = Deno.env.get("CAKTO_SECRET"); // Chave secreta configurada no Supabase

Deno.serve(async (req) => {
    try {
        const payload = await req.json();
        console.log("Recebendo Webhook Cakto:", JSON.stringify(payload, null, 2));

        // 1. Verificação de Segurança
        // A Cakto envia a chave no campo 'secret' ou você pode validar o token
        const receivedSecret = payload.secret || payload.data?.secret;

        if (CAKTO_SECRET && receivedSecret !== CAKTO_SECRET) {
            console.error("Segurança: Chave secreta inválida!");
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const event = payload.event || payload.data?.event;
        const customerEmail = payload.data?.customer?.email;

        if (event === "purchase_approved" && customerEmail) {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

            // 2. Buscar o usuário pelo e-mail
            const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
            if (listError) throw listError;

            const user = users.find((u) => u.email === customerEmail);

            if (user) {
                console.log(`Usuário encontrado: ${user.id}. Atualizando para Pro...`);

                // 3. Atualizar a tabela profiles
                const { error: updateError } = await supabase
                    .from("profiles")
                    .update({ subscription: "Pro" })
                    .eq("id", user.id);

                if (updateError) throw updateError;

                return new Response(JSON.stringify({ message: "Assinatura PRO ativada!" }), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            }
        }

        return new Response(JSON.stringify({ message: "Evento ignorado" }), { status: 200 });
    } catch (error) {
        console.error("Erro no Webhook:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});
