import { NextResponse } from "next/server";
import { DiagnosticPayload } from "../../../lib/types";

export async function POST(request: Request) {
  try {
    const payload: DiagnosticPayload = await request.json();

    // 1. Validar campos obrigatórios mínimos
    if (!payload.contact || !payload.contact.name || !payload.contact.email || !payload.contact.company) {
      return NextResponse.json(
        { error: "Dados de contato obrigatórios ausentes." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DIAGNOSTIC_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log("=== DIAGNOSTIC API [DEMO MODE] ===");
      console.log("Payload recebido com sucesso:", JSON.stringify(payload, null, 2));
      return NextResponse.json({
        success: true,
        message: "Recebido em modo demo (DIAGNOSTIC_WEBHOOK_URL não configurada).",
        payload
      });
    }

    // 2. Enviar para webhook real de forma segura
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ao enviar webhook: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: "Falha ao sincronizar dados com o servidor de destino." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Diagnóstico enviado com sucesso!"
    });
  } catch (error: any) {
    console.error("Erro interno no webservice de diagnóstico:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
