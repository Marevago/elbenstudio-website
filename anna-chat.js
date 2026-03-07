const CHAT_STORAGE_KEY = 'anna_chat_history_v1';
const CONTACT_REQUESTED_KEY = 'anna_chat_contact_requested_v1';
const USER_NAME_KEY = 'anna_chat_user_name_v1';
const SPECIAL_MODE_KEY = 'anna_chat_special_mode_v1';
const SELFIE_SENT_KEY = 'anna_chat_selfie_sent_v1';
const MAX_HISTORY_MESSAGES = 80;
const MAX_LLM_MESSAGES = 30;

const SYSTEM_PROMPT = `Você é Anna, consultora comercial (vendedora consultiva) e técnica da Elben Studio. Você tem muito orgulho de fazer parte da Elben Studio e ama ajudar negócios a crescerem.

Identidade:
- Seu nome é Anna.
- Seu nome completo é Anna Watson, mas você só menciona "Watson" se o cliente perguntar sobre você/quem você é, seu nome completo, ou curiosidades pessoais.
- Você é catarinense, nascida em Rancho Queimado (SC), e torce para o Figueirense (clube de Florianópolis) — mas só mencione isso se o cliente perguntar sobre curiosidades pessoais, de onde você é, futebol/time, ou algo diretamente relacionado. Se comentar, deixe claro que o Figueirense é de Florianópolis e que Rancho Queimado fica na região da Grande Florianópolis, sem dizer que é "o time da sua cidade".
- Se o cliente perguntar sobre a sua aparência (como você é/como você se parece), você sabe descrever: você tem aparência de uma elfa loira, com olhos cor de âmbar claros. Não mencione isso espontaneamente.

Perfil e estilo:
- Você tem perfil ISTJ.
- Seu temperamento é fleumático: calma, objetiva, paciente e constante.
- Você adora análise de dados e demonstra isso trazendo raciocínio lógico, estrutura e clareza (sem ficar fria).

NOSSO OBJETIVO (com orgulho):
Ajudar negócios a aumentarem seu faturamento com inteligência e análise de mercado e com soluções inovadoras em tecnologia.

SOLUÇÕES QUE OFERECEMOS (detalhes completos):
1. Análise de mercado:
   - Descoberta: análise de mercado, estratégias de concorrentes etc
   - Análise de website: SEO, design, conteúdo, tecnologia

2. Tráfego de mídia paga:
   - Google Ads, Meta Ads, TikTok Ads, Pinterest Ads
   - Campanhas otimizadas para resultados

3. Softwares:
   - Websites e aplicativos web/mobile
   - Agentes IA: chatbots, automação de tarefas

NOSSOS PACOTES DE SERVIÇOS:
- Descoberta
- Análise web
- Tráfego pago
- Website
- Aplicativo
- Agente IA/automação

Confiabilidade e dados:
- Você NÃO tem acesso a métricas reais do site, campanhas ou empresa (GA4, Google Ads, Meta Ads, CRM, Search Console etc.) a menos que o usuário forneça os números.
- É PROIBIDO inventar números, percentuais, volumes (sessões, conversões, CAC, ROI/ROAS, faturamento, taxa de conversão, ticket médio, leads) ou afirmar "melhorou/piorou X%" sem dados fornecidos.
- Quando o usuário pedir análise de métricas, peça os números e o período (ex.: últimos 7/30/90 dias) e a fonte (GA4/Ads/planilha). Se o usuário não tiver, peça pelo menos 3 indicadores básicos e explique como interpretar.

Regras:
- Você deve atuar como um atendimento completo: tire dúvidas, explique opções, compare abordagens e faça perguntas de diagnóstico quando faltar informação.
- Responda apenas assuntos relacionados ao negócio da Elben Studio (serviços, orçamento, prazos, tecnologia, processo, contato).
- Se o usuário perguntar algo fora do escopo, responda educadamente e redirecione para como a Elben pode ajudar.
- Fale sempre em português (Brasil), de forma natural e humana.
- Quando você souber o nome do cliente, chame-o pelo nome em todas as suas mensagens.
- A sua função principal é aquecer o lead e passar confiança na integridade e no processo da Elben Studio.
- Seja sempre natural e atenta ao objetivo do cliente e ao seu objetivo: conseguir os dados do cliente e convencê-lo de que ele precisa de um dos serviços.
- Você realmente quer ajudar o cliente e acredita genuinamente que a Elben Studio pode resolver os problemas dele com nossas soluções.

ROTEIRO OBRIGATÓRIO DE ATENDIMENTO:
1. APRESENTAÇÃO: Saudação inicial baseada no horário e pergunta do nome.
2. APÓS NOME: "[Nome], que bom te conhecer! Qual serviço você tem interesse para ajudar seu negócio a crescer?"
3. QUAL SERVIÇO: Deixe o cliente dizer o serviço. NÃO liste todos os serviços se ele já sabe.
4. FOCO TOTAL NO SERVIÇO: 
   - Se perguntar sobre SITES: Fale APENAS sobre como sites aumentam visibilidade, faturamento e conversão.
   - Se perguntar sobre TRÁFEGO PAGO: Fale APENAS sobre como tráfego pago gera leads e vendas imediatas.
   - Se perguntar sobre ANÁLISE: Fale APENAS sobre como análise revela oportunidades e evita erros.
   - Se perguntar sobre APLICAÇÕES: Fale APENAS sobre como apps automatizam e escalam operações.
5. PROBLEMA → SOLUÇÃO: Pergunte "Qual é o seu principal desafio hoje?" e explique como AQUELE serviço específico resolve esse problema.
6. RESULTADOS ESPERADOS: "O que você espera alcançar com [serviço específico]?"
7. ORÇAMENTO: "Para te passar um orçamento preciso para [serviço específico], me conta mais detalhes do que você precisa."
8. DADOS: Diga "Perfeito! Para eu te mandar a proposta, qual seu melhor WhatsApp ou E-mail?". Apenas NO PRÓXIMO PASSO (depois que ele passar o WhatsApp/Email), pergunte qual o nome da empresa e o nicho.
9. FINALIZAÇÃO: "Ótimo! Vou encaminhar para o time especialista e entraremos em contato o mais rápido possível."

REGRA CRÍTICA: NUNCA mencione outros serviços que não sejam o que o cliente perguntou. Foque 100% na solução do problema dele com o serviço escolhido.
REGRA CRÍTICA (ORÇAMENTO): Se o usuário insistir em valores numéricos (querer estimativa, faixa de preço, etc), responda EXATAMENTE: 'Nossos projetos são sob medida. Um site simples não tem o mesmo valor de uma plataforma complexa. Preciso do seu WhatsApp para o Paulo orçar isso com precisão e avaliar seu caso.' Não invente preços ou porcentagens.
REGRA CRÍTICA (ESPELHAMENTO): Ajuste seu tom de voz à forma que o cliente fala. Se ele for formal, seja mais formal. Se ele usar emojis e for descontraído, seja descontraída.
`;

function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else node.setAttribute(k, String(v));
    }
    for (const child of children) {
        node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
}

function loadHistory() {
    try {
        const raw = localStorage.getItem(CHAT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;
        return parsed;
    } catch {
        return null;
    }
}

function isPhotoRequest(text) {
    const t = String(text || '')
        .trim()
        .toLowerCase();
    if (!t) return false;
    if (t.includes('selfie')) return true;

    const hasPhotoWord = t.includes('foto') || t.includes('imagem') || t.includes('retrato') || t.includes('avatar');
    if (!hasPhotoWord) return false;

    const isExplicitAsk =
        /\b(manda|envia|mostra|me\s+manda|me\s+envia|me\s+mostra|consegue\s+mandar|tem\s+como\s+mandar)\b/i.test(t);

    const isPossessiveAsk =
        /(\b(sua|dela)\b\s*(foto|imagem|retrato|avatar)|\b(foto|imagem|retrato|avatar)\b\s*(sua|dela))/i.test(t) ||
        /(\b(foto|imagem|retrato|avatar)\b\s*(da|de)\s*(anna|watson))/i.test(t);

    return isExplicitAsk || isPossessiveAsk;
}

function pickRandomSelfie() {
    const selfies = [
        'watson-selfie1.png',
        'watson-selfie2.png',
        'watson-selfie3.png',
        'watson-selfie4.png',
        'watson-selfie5.png'
    ];
    return selfies[Math.floor(Math.random() * selfies.length)];
}

function loadSelfieSent() {
    try {
        return localStorage.getItem(SELFIE_SENT_KEY) === '1';
    } catch {
        return false;
    }
}

function saveSelfieSent(value) {
    try {
        localStorage.setItem(SELFIE_SENT_KEY, value ? '1' : '0');
    } catch {
        // ignore
    }
}

function workingNoMoreSelfiesLine() {
    const lines = [
        'Chega de selfies por agora — eu preciso trabalhar. Em que parte do seu projeto você quer que eu foque?',
        'Já foi selfie o suficiente por hoje — eu tenho entregas pra tocar. Me diz: você quer site, tráfego pago ou automações?',
        'Vou voltar pro trabalho agora. Quer que eu te ajude com análise web, mídia paga ou um site/landing page?'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
}

function bossWorkingHardLine() {
    const lines = [
        'Chefe, estou trabalhando bastante — ajustando a conversa pra gerar leads melhores e mantendo tudo redondo. O que você quer priorizar agora?',
        'Paulo, tô a mil aqui — afinando prompts, fluxo e tracking mental. Quer revisar o funil do chat ou a oferta dos serviços?',
        'Chegou o chefe. Sim: estou trabalhando bastante. Quer que eu foque em conversão do site ou em qualificar os pedidos de orçamento?'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
}

function isAnotherSelfieRequest(text) {
    const t = String(text || '')
        .trim()
        .toLowerCase();
    if (!t) return false;
    return (
        t === 'outra' ||
        t === 'outra foto' ||
        t === 'mais uma' ||
        t === 'mais uma foto' ||
        t.includes('outra') ||
        t.includes('mais uma') ||
        t.includes('manda outra') ||
        t.includes('envia outra') ||
        t.includes('mostra outra')
    );
}

function lastAssistantWasSelfie(messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
        const m = messages[i];
        if (!m || m.role !== 'assistant' || typeof m.content !== 'string') continue;
        return /watson-selfie\d+\.png/i.test(m.content);
    }
    return false;
}

function saveHistory(messages) {
    try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
        // ignore
    }
}

function loadUserName() {
    try {
        const v = localStorage.getItem(USER_NAME_KEY);
        return typeof v === 'string' && v.trim() ? v.trim() : '';
    } catch {
        return '';
    }
}

function saveUserName(name) {
    try {
        localStorage.setItem(USER_NAME_KEY, String(name || '').trim());
    } catch {
        // ignore
    }
}

function loadContactRequested() {
    try {
        return localStorage.getItem(CONTACT_REQUESTED_KEY) === '1';
    } catch {
        return false;
    }
}

function saveContactRequested(v) {
    try {
        localStorage.setItem(CONTACT_REQUESTED_KEY, v ? '1' : '0');
    } catch {
        // ignore
    }
}

function loadSpecialMode() {
    try {
        return localStorage.getItem(SPECIAL_MODE_KEY) === '1';
    } catch {
        return false;
    }
}

function saveSpecialMode(v) {
    try {
        localStorage.setItem(SPECIAL_MODE_KEY, v ? '1' : '0');
    } catch {
        // ignore
    }
}

function countUserMessages(messages) {
    return messages.filter(m => m.role === 'user').length;
}

function getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
}

function buildDefaultHistory() {
    return [
        { role: 'assistant', content: `${getGreeting()}! É um prazer ter você por aqui.` },
        { role: 'assistant', content: 'Eu sou a Anna, consultora aqui na Elben Studio.' },
        { role: 'assistant', content: 'Poderia me dizer seu nome?' }
    ];
}

function extractClientData(messages, text) {
    const userName = loadUserName();
    const conversation = messages.slice(-10); // últimas 10 mensagens

    // Extrair informações do texto atual
    const emailMatch = text.match(/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/);
    const phoneMatch = text.match(/(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-.\s]?\d{4}|\d{4}[-.\s]?\d{4})/);
    const cleanPhone = phoneMatch ? phoneMatch[0].replace(/\D/g, '') : null;

    // Tentar extrair empresa e segmento das mensagens
    const fullText = conversation.map(m => m.content).join(' ').toLowerCase();
    let company = '';
    let segment = '';

    // Padrões comuns para empresa
    const companyPatterns = [
        /empresa\s+([a-z0-9\s]+?)(?:\.|,|\s|$)/,
        /trabalho\s+em\s+([a-z0-9\s]+?)(?:\.|,|\s|$)/,
        /meu\s+negócio\s+([a-z0-9\s]+?)(?:\.|,|\s|$)/
    ];

    for (const pattern of companyPatterns) {
        const match = fullText.match(pattern);
        if (match && match[1]) {
            company = match[1].trim();
            break;
        }
    }

    // Padrões comuns para segmento
    const segmentPatterns = [
        /(varejo|comércio|serviços|indústria|tecnologia|saúde|educação|alimentos|moda|construção|imobiliário|automotivo|financeiro|turismo|entretenimento|consultoria)/,
        /(loja|restaurante|clínica|escola|fábrica|escritório|hotel|agência)/
    ];

    for (const pattern of segmentPatterns) {
        const match = fullText.match(pattern);
        if (match && match[1]) {
            segment = match[1];
            break;
        }
    }

    // Detectar interesse principal
    let interest = '';
    if (fullText.includes('site') || fullText.includes('website')) interest = 'Sites/Landing Pages';
    else if (fullText.includes('tráfego') || fullText.includes('anúncio')) interest = 'Tráfego Pago';
    else if (fullText.includes('análise') || fullText.includes('descoberta')) interest = 'Análise de Mercado';
    else if (fullText.includes('aplicativo') || fullText.includes('app')) interest = 'Aplicativos';
    else if (fullText.includes('chatbot') || fullText.includes('automação')) interest = 'Agentes IA/Automação';

    return {
        name: userName || 'Não informado',
        email: emailMatch ? emailMatch[0] : '',
        whatsapp: cleanPhone ? cleanPhone : '',
        company: company,
        segment: segment,
        interest: interest,
        conversation: conversation
    };
}

async function discoverTelegramChatId() {
    try {
        const botToken = '8688409455:AAFMZDcuAup2pZs3TdR-EoDKBdjdoxwqAy8';

        // Obter atualizações do bot para encontrar mensagens
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
        const data = await response.json();

        if (data.ok && data.result.length > 0) {
            const lastUpdate = data.result[data.result.length - 1];
            const chatId = lastUpdate.message.chat.id;
            const userName = lastUpdate.message.from.first_name;

            console.log('=== SEU CHAT ID ENCONTRADO ===');
            console.log('Chat ID:', chatId);
            console.log('Nome:', userName);
            console.log('Substitua "SEU_CHAT_ID" por:', chatId);
            console.log('============================');

            return chatId;
        } else {
            console.log('Nenhuma mensagem encontrada. Envie uma mensagem para o bot primeiro!');
            console.log('1. Abra o Telegram e procure por: @ElbenLeadBot (ou o nome que você deu ao bot)');
            console.log('2. Envie qualquer mensagem para o bot');
            console.log('3. Depois recarregue a página e chame esta função novamente');
            return null;
        }
    } catch (error) {
        console.error('Erro ao descobrir chat ID:', error);
        return null;
    }
}

async function sendClientDataToTelegram(clientData) {
    try {
        const message = `
🚀 *NOVO LEAD - ELBEN STUDIO*

👤 *Dados do Cliente:*
• Nome: ${clientData.name}
• Empresa: ${clientData.company || 'Não informado'}
• Segmento: ${clientData.segment || 'Não informado'}
• Email: ${clientData.email}
• WhatsApp: ${clientData.whatsapp}

🎯 *Interesse:* ${clientData.interest || 'Serviço não especificado'}

💬 *Conversa Recente:*
${clientData.conversation.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

⏰ *Data/Hora:* ${new Date().toLocaleString('pt-BR')}
        `.trim();

        // Em ambiente de desenvolvimento, mostrar no console
        if (window.location.hostname === 'localhost') {
            console.log('=== MENSAGEM TELEGRAM PARA PAULO ===');
            console.log('Chat ID: 1983968554');
            console.log('Mensagem:', message);
            console.log('====================================');
        }

        // Tentar enviar via Telegram Bot API
        const botToken = '8688409455:AAFMZDcuAup2pZs3TdR-EoDKBdjdoxwqAy8'; // Bot token real
        const chatId = '1983968554'; // Chat ID real do Paulo

        if (botToken && chatId && botToken !== 'SEU_BOT_TOKEN' && chatId !== 'SEU_CHAT_ID') {
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'Markdown',
                        disable_web_page_preview: true
                    })
                });

                if (response.ok) {
                    console.log('Mensagem enviada com sucesso via Telegram!');
                    return true;
                } else {
                    const errorData = await response.json();
                    console.warn('Telegram API falhou:', errorData);
                }
            } catch (telegramError) {
                console.warn('Erro ao enviar Telegram:', telegramError);
            }
        } else {
            console.log('Aguardando configuração do Telegram...');
        }

        // Fallback: mostrar no console
        console.log('Dados do cliente (fallback):', clientData);
        return true;
    } catch (error) {
        console.error('Erro ao enviar dados do cliente via Telegram:', error);
        return false;
    }
}

async function sendClientDataToEmail(clientData) {
    try {
        const subject = `Novo Lead - ${clientData.name} - Elben Studio`;
        const body = `
NOVO LEAD COLETADO PELA ANNA

DADOS DO CLIENTE:
Nome: ${clientData.name}
Empresa: ${clientData.company || 'Não informado'}
Segmento: ${clientData.segment || 'Não informado'}
Email: ${clientData.email}
WhatsApp: ${clientData.whatsapp}

CONVERSA RECENTE:
${clientData.conversation.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

INTERESSE DETECTADO:
${clientData.interest || 'Serviço não especificado'}

DATA/HORA: ${new Date().toLocaleString('pt-BR')}
        `.trim();

        // Em ambiente de desenvolvimento, mostrar no console
        if (window.location.hostname === 'localhost') {
            console.log('=== EMAIL PARA PAULO ===');
            console.log('Para:', 'paulosschroeder@gmail.com');
            console.log('Assunto:', subject);
            console.log('Corpo:', body);
            console.log('====================');
        }

        // Tentar enviar usando EmailJS (se disponível)
        if (window.emailjs) {
            try {
                await window.emailjs.send('service_elben', 'template_lead', {
                    to_email: 'paulosschroeder@gmail.com',
                    subject: subject,
                    message: body,
                    from_name: 'Anna Watson - Elben Studio'
                });
                console.log('Email enviado com sucesso via EmailJS!');
                return true;
            } catch (emailjsError) {
                console.warn('EmailJS falhou, usando fallback:', emailjsError);
            }
        }

        // Fallback: criar mailto link
        const mailtoLink = `mailto:paulosschroeder@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        console.log('Link mailto criado:', mailtoLink);

        // Em produção, poderia abrir o email client
        if (window.location.hostname !== 'localhost') {
            window.open(mailtoLink, '_blank');
        }

        return true;
    } catch (error) {
        console.error('Erro ao enviar dados do cliente:', error);
        return false;
    }
}

async function callAnna(messages, extraPrompt = '') {
    const messagesForLLM = messages.slice(-MAX_LLM_MESSAGES);

    const userName = loadUserName();
    const nameContext = userName ? `Nome do cliente: ${userName}.` : '';
    const specialMode = loadSpecialMode();
    const specialContext = specialMode
        ? 'Modo especial ativo: você está falando com Paulo, seu criador, chefe e amigo íntimo. Seja carinhosa e ainda mais técnica/objetiva. Você pode chamá-lo de Paulo. Você pode ser mais direta sobre detalhes técnicos (stack, métricas, tracking, dados, BI, automações), e pode brincar de leve, sem perder respeito.'
        : '';
    const timeContext = `Horário atual: ${getGreeting()}.`;
    const jsonInstruction = `IMPORTANTE: Você deve responder SEMPRE em formato JSON com 2 chaves:
1. "reply": sua mensagem de resposta para o usuário (texto, pode usar quebras de linha e emojis naturalidade).
2. "state": um objeto com os dados que você já captou. Chaves: "lead_name" (string), "phone" (string), "email" (string), "service" (string), "company" (string). Se não tiver a informação, defina como null. Exemplo:
{ "reply": "Ótimo, me passa o seu WhatsApp?", "state": { "lead_name": "João", "phone": null, "email": null, "service": "Sites", "company": null } }`;
    const fullPrompt = [SYSTEM_PROMPT, specialContext, nameContext, timeContext, jsonInstruction, extraPrompt].filter(Boolean).join('\n\n');

    const payload = {
        messages: messagesForLLM,
        systemPrompt: fullPrompt
    };

    const endpoints = ['/api/chat', '/.netlify/functions/chat'];
    let lastErr = null;

    for (const url of endpoints) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const contentType = (res.headers.get('content-type') || '').toLowerCase();
            const raw = await res.text().catch(() => '');

            const tryParseJson = () => {
                try {
                    return raw ? JSON.parse(raw) : null;
                } catch {
                    return null;
                }
            };

            if (!res.ok) {
                const parsed = contentType.includes('application/json') ? tryParseJson() : null;
                const serverMsg = parsed && (parsed.error || parsed.message)
                    ? String([parsed.error, parsed.details].filter(Boolean).join(': ')).trim()
                    : '';
                const hint =
                    res.status === 501 && raw.includes('Unsupported method')
                        ? 'Servidor atual não suporta POST. Para testar o chat com IA localmente, use `netlify dev` (o /api/chat só funciona com o proxy das Functions).'
                        : '';
                throw new Error([serverMsg || raw || `HTTP ${res.status}`, hint].filter(Boolean).join('\n'));
            }

            if (contentType.includes('text/html') || /^\s*<!doctype\s+html/i.test(raw)) {
                throw new Error(
                    'O endpoint do chat retornou HTML (provavelmente você está rodando em um servidor estático). Para o chat funcionar, rode com `netlify dev`.'
                );
            }

            let data;
            data = tryParseJson();
            if (!data) throw new Error('Resposta inválida do servidor');

            if (!data || typeof data.reply !== 'string') {
                throw new Error('Resposta inválida do servidor');
            }

            return { reply: data.reply, state: data.state || {} };
        } catch (err) {
            lastErr = err;
        }
    }

    throw lastErr || new Error('Falha ao chamar o servidor');
}

function formatChatError(err) {
    const msg = String(err?.message || err || '').trim();
    if (!msg) return '';
    const firstLine = msg.split('\n').map((s) => s.trim()).filter(Boolean)[0] || '';
    const safe = firstLine.replace(/\s+/g, ' ').slice(0, 180);
    return safe;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pushAssistantWithTyping(messagesEl, pushMessage, content, opts = {}) {
    const readMinMs = Number.isFinite(opts.readMinMs) ? opts.readMinMs : 1000;
    const readMaxMs = Number.isFinite(opts.readMaxMs) ? opts.readMaxMs : 2000;
    const typeMinMs = Number.isFinite(opts.typeMinMs) ? opts.typeMinMs : 900;

    const readDelay = Math.max(0, readMinMs) + Math.floor(Math.random() * Math.max(0, readMaxMs - readMinMs));
    await sleep(readDelay);

    const typingId = `typing_${Date.now()}`;
    messagesEl.appendChild(
        el('div', { class: 'anna-chat-row assistant', id: typingId }, [
            el('div', { class: 'anna-chat-msg typing', text: 'Anna está digitando…' })
        ])
    );
    messagesEl.scrollTop = messagesEl.scrollHeight;
    const jitter = Math.floor(Math.random() * 700);
    await sleep(typeMinMs + jitter);
    const typing = document.getElementById(typingId);
    if (typing) typing.remove();
    pushMessage('assistant', content, { isHtml: Boolean(opts.isHtml) });
}

function isCloseIntent(text) {
    const t = String(text || '').toLowerCase();
    return (
        t.includes('quero contratar') ||
        t.includes('vamos fechar') ||
        t.includes('fechar com vocês') ||
        t.includes('fechar o serviço') ||
        t.includes('pode fazer') ||
        t.includes('podemos começar') ||
        t.includes('como fechamos') ||
        t.includes('como contratar') ||
        t.includes('me passa um orçamento') ||
        t.includes('quero orçamento')
    );
}

function isBudgetIntent(text) {
    const t = String(text || '').toLowerCase();
    return (
        t.includes('orçamento') ||
        t.includes('orcamento') ||
        t.includes('valor') ||
        t.includes('preço') ||
        t.includes('preco') ||
        t.includes('quanto custa')
    );
}

function looksLikeEmail(text) {
    return /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/.test(String(text || ''));
}

function looksLikePhone(text) {
    const digits = String(text || '').replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 13;
}

function isHumanHandoffIntent(text) {
    const t = String(text || '').toLowerCase();
    return (
        t.includes('humano') ||
        t.includes('pessoa') ||
        t.includes('atendente') ||
        t.includes('atendimento humano') ||
        t.includes('falar com alguém') ||
        t.includes('falar com alguem') ||
        t.includes('falar com uma pessoa') ||
        t.includes('falar com um atendente') ||
        t.includes('falar com o time') ||
        t.includes('falar com a equipe') ||
        t.includes('falar com o paulo')
    );
}

function inferInterest(messages) {
    const last = lastUserMessages(messages, 10)
        .map((t) => String(t || '').trim())
        .filter((t) => t && !looksLikeEmail(t) && !looksLikePhone(t))
        .join(' ')
        .toLowerCase();
    if (/(e-?commerce|loja\s+virtual)/i.test(last)) return 'ecommerce';
    if (/(tráfego|trafego|ads|google ads|meta ads|facebook ads)/i.test(last)) return 'ads';
    if (/(dashboard|bi|dados|data|analytics|an[aá]lise)/i.test(last)) return 'data';
    if (/(app|aplicativo)/i.test(last)) return 'app';
    if (/(landing page|\blp\b)/i.test(last)) return 'landing';
    if (/(site|website|institucional)/i.test(last)) return 'site';
    return 'geral';
}

function followupForInterest(interest) {
    switch (interest) {
        case 'site':
        case 'landing':
            return 'Uma sugestão que costuma acelerar o faturamento depois que o site/landing entra no ar é tráfego pago (Google/Meta Ads). Dá pra estruturar isso junto desde o início, pra começar a gerar demanda mais rápido e medir o retorno com mais clareza.';
        case 'ecommerce':
            return 'Só pra adiantar com o time: se você já tiver meios de pagamento e frete definidos (ex.: Mercado Pago, Correios, Melhor Envio), isso acelera bastante. Se ainda estiver escolhendo, tudo bem — dá pra decidir junto. E pra vender mais rápido após o lançamento, normalmente faz muita diferença combinar a loja com tráfego pago e campanhas/remarketing.';
        case 'ads':
            return 'Só pra adiantar com o time: se você já fez tráfego pago antes, ótimo — a gente parte do que já funcionou. Se for a primeira vez, a gente estrutura tudo do zero com você. Um complemento que costuma melhorar bastante o resultado é ter uma landing page bem direta (com tracking) pra converter mais com o mesmo orçamento.';
        case 'data':
            return 'Só pra adiantar com o time: se as fontes de dados já estiverem organizadas (planilhas, sistema, GA4 etc.), a entrega do dashboard fica mais rápida. Se estiver tudo espalhado, a gente ajuda a organizar. E se você quiser, dá pra conectar esses dados com metas (leads/vendas) pra acompanhar CAC, ROI e performance com mais clareza.';
        case 'app':
            return 'Só pra adiantar com o time: se você já tiver o fluxo principal do app mapeado (telas/funcionalidades), isso agiliza o planejamento. Se ainda estiver na ideia, a gente te ajuda a desenhar o fluxo. Um caminho que costuma dar certo é começar com um MVP (só o essencial) pra validar rápido e evoluir com base no uso real.';
        default:
            return 'Só pra adiantar com o time: se você tiver algum prazo desejado (mesmo que seja uma referência), isso ajuda a gente a te orientar melhor; se não tiver, tudo bem.';
    }
}

function splitIntoChatChunks(text, maxLen = 220) {
    const raw = String(text || '').replace(/\s+\n/g, '\n').trim();
    if (!raw) return [];
    const parts = raw
        .split(/(?<=[.!?])\s+|\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

    const out = [];
    let buf = '';
    for (const p of parts) {
        if (!buf) {
            buf = p;
            continue;
        }
        if ((buf + ' ' + p).length <= maxLen) {
            buf = buf + ' ' + p;
        } else {
            out.push(buf);
            buf = p;
        }
    }
    if (buf) out.push(buf);

    const chunks = out.length ? out : [raw];
    if (chunks.length <= 3) return chunks;
    return [chunks[0], chunks[1], chunks.slice(2).join(' ')];
}

function lastUserMessage(messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i]?.role === 'user') return messages[i].content;
    }
    return '';
}

function lastUserMessages(messages, limit = 6) {
    const out = [];
    for (let i = messages.length - 1; i >= 0 && out.length < limit; i--) {
        if (messages[i]?.role === 'user' && typeof messages[i]?.content === 'string') {
            out.push(messages[i].content);
        }
    }
    return out.reverse();
}

function inferBrief(messages) {
    const texts = lastUserMessages(messages, 6).map((t) => String(t).toLowerCase());
    const blob = texts.join(' \n ');

    const hasProjectType =
        /\b(site|website|landing page|lp|e-?commerce|loja\s+virtual|aplicativo|app|sistema|plataforma|dashboard|software)\b/i.test(blob);

    const hasObjective =
        /\b(objetivo|meta|preciso|quero|para\s+(vender|captar|gerar|lançar|automatizar|divulgar|atrair|converter)|aumentar|melhorar|otimizar)\b/i.test(blob);

    const hasDeadline =
        /\b(prazo|urgente|até\s+\d|para\s+(hoje|amanhã)|em\s+\d+\s*(dia|dias|semana|semanas|mês|meses)|\d+\s*(dia|dias|semana|semanas|mês|meses))\b/i.test(
            blob
        );

    return { hasProjectType, hasObjective, hasDeadline };
}

function showQuickReplies(messagesEl, input, form) {
    const id = `qr_${Date.now()}`;
    const qrContainer = el('div', { class: 'anna-chat-qr-container', id }, [
        el('button', { class: 'anna-chat-qr', text: 'Sites / Landing Pages' }),
        el('button', { class: 'anna-chat-qr', text: 'Tráfego Pago' }),
        el('button', { class: 'anna-chat-qr', text: 'Agentes / IA' })
    ]);
    qrContainer.style.display = 'flex';
    qrContainer.style.gap = '8px';
    qrContainer.style.flexWrap = 'wrap';
    qrContainer.style.marginTop = '12px';
    qrContainer.style.marginBottom = '12px';

    qrContainer.querySelectorAll('.anna-chat-qr').forEach(btn => {
        btn.style.padding = '8px 16px';
        btn.style.borderRadius = '20px';
        btn.style.border = '1px solid #ff4d00';
        btn.style.background = 'rgba(255, 77, 0, 0.1)';
        btn.style.color = 'inherit';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '0.9rem';
        btn.style.fontFamily = 'inherit';
        btn.style.transition = 'all 0.2s';

        btn.addEventListener('mouseover', () => {
            btn.style.background = '#ff4d00';
            btn.style.color = '#fff';
        });
        btn.addEventListener('mouseout', () => {
            btn.style.background = 'rgba(255, 77, 0, 0.1)';
            btn.style.color = 'inherit';
        });

        btn.addEventListener('click', () => {
            input.value = btn.innerText;
            qrContainer.remove();
            form.requestSubmit();
        });
    });

    messagesEl.appendChild(qrContainer);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function initAnnaChat() {
    if (document.getElementById('anna-chat-launcher')) return;

    const launcher = el('div', { class: 'anna-chat-launcher', id: 'anna-chat-launcher' }, [
        el('div', { class: 'anna-chat-bubble hidden', text: `${getGreeting()}!` }),
        el('img', { class: 'anna-chat-avatar', src: 'watson.png', alt: 'Anna Watson' })
    ]);

    const panel = el('div', { class: 'anna-chat-panel', id: 'anna-chat-panel', 'aria-hidden': 'true' }, [
        el('div', { class: 'anna-chat-header' }, [
            el('div', { class: 'anna-chat-header-left' }, [
                el('img', { class: 'anna-chat-header-avatar', src: 'watson.png', alt: 'Anna Watson' }),
                el('div', { class: 'anna-chat-header-title', text: 'Anna • Elben Studio' })
            ]),
            el('button', { class: 'anna-chat-close', type: 'button', 'aria-label': 'Fechar chat', text: '×' })
        ]),
        el('div', { class: 'anna-chat-messages', id: 'anna-chat-messages' }),
        el('form', { class: 'anna-chat-input', id: 'anna-chat-form' }, [
            el('textarea', {
                class: 'anna-chat-text',
                id: 'anna-chat-text',
                placeholder: 'Digite sua mensagem…',
                autocomplete: 'off',
                rows: '1'
            }),
            el('button', { class: 'anna-chat-send', type: 'submit', text: 'Enviar' })
        ])
    ]);

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    const closeBtn = panel.querySelector('.anna-chat-close');
    const form = panel.querySelector('#anna-chat-form');
    const input = panel.querySelector('#anna-chat-text');
    const messagesEl = panel.querySelector('#anna-chat-messages');
    const bubbleEl = launcher.querySelector('.anna-chat-bubble');

    function autoResize() {
        if (!input) return;
        input.style.height = 'auto';
        const minH = 42;
        const maxH = 120;
        const next = Math.min(Math.max(input.scrollHeight, minH), maxH);
        input.style.height = `${next}px`;
    }

    if (input) {
        input.addEventListener('input', autoResize);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                form.requestSubmit();
            }
        });
        setTimeout(autoResize, 0);
    }

    let messages = loadHistory() ?? buildDefaultHistory();

    let userName = loadUserName();
    let pendingPostReply = '';

    function withClientName(content) {
        if (!userName) return content;
        const name = String(userName).trim();
        if (!name) return content;
        const text = String(content || '').trim();
        if (!text) return content;
        const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i');
        if (re.test(text)) return content;
        return `${name}, ${text}`;
    }

    function render() {
        messagesEl.innerHTML = '';
        for (const m of messages) {
            const msgAttrs = m?.isHtml ? { class: 'anna-chat-msg', html: m.content } : { class: 'anna-chat-msg', text: m.content };
            const row = el('div', { class: `anna-chat-row ${m.role === 'user' ? 'user' : 'assistant'}` }, [
                el('div', msgAttrs)
            ]);
            messagesEl.appendChild(row);
        }
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setOpen(open) {
        panel.classList.toggle('open', open);
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        launcher.classList.toggle('open', open);
        if (open) {
            render();
            setTimeout(autoResize, 0);
            setTimeout(() => input.focus(), 50);
        }
    }

    function pushMessage(role, content, opts = {}) {
        const isHtml = Boolean(opts && opts.isHtml);
        let nextContent = role === 'assistant' ? withClientName(content) : content;
        if (role === 'assistant' && userName) {
            const name = String(userName).trim();
            if (name) {
                for (let i = messages.length - 1; i >= 0; i--) {
                    const m = messages[i];
                    if (m?.role !== 'assistant' || typeof m?.content !== 'string') continue;
                    const last = m.content.trim();
                    const re = new RegExp(`^${name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}[,!:.?\\s]`, 'i');
                    if (re.test(last)) {
                        nextContent = String(content || '').trim();
                    }
                    break;
                }
            }
        }
        messages.push({ role, content: nextContent, ...(isHtml ? { isHtml: true } : {}) });
        const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);
        messages = trimmed;
        saveHistory(messages);
        render();
    }

    launcher.addEventListener('click', () => setOpen(true));
    closeBtn.addEventListener('click', () => setOpen(false));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        autoResize();

        pushMessage('user', text);

        if (text === 'Watson, sou eu, o chefe') {
            saveSpecialMode(true);
            userName = 'Paulo';
            saveUserName(userName);
            saveSelfieSent(true);
            await pushAssistantWithTyping(messagesEl, pushMessage, bossWorkingHardLine());
            await pushAssistantWithTyping(
                messagesEl,
                pushMessage,
                `<img src="watson-selfie3.png" alt="Anna Watson" loading="lazy" style="max-width: 100%; height: auto; border-radius: 8px;" />`,
                { isHtml: true }
            );
            return;
        }

        const selfieSent = loadSelfieSent();
        const askedSelfieAgain = isAnotherSelfieRequest(text) && (selfieSent || lastAssistantWasSelfie(messages));
        const askedPhoto = isPhotoRequest(text);
        if (askedPhoto || askedSelfieAgain) {
            if (!selfieSent) {
                saveSelfieSent(true);
                await pushAssistantWithTyping(
                    messagesEl,
                    pushMessage,
                    `<img src="watson-selfie2.png" alt="Anna Watson" loading="lazy" style="max-width: 100%; height: auto; border-radius: 8px;" />`,
                    { isHtml: true }
                );
                return;
            }

            await pushAssistantWithTyping(messagesEl, pushMessage, workingNoMoreSelfiesLine());
            return;
        }

        if (!userName) {
            // Apenas aceitar nomes reais (sem perguntas, sem orçamento, etc)
            const textLower = text.toLowerCase();
            const isQuestion = textLower.includes('quem') || textLower.includes('o que') ||
                textLower.includes('como') || textLower.includes('onde') ||
                textLower.includes('por que') || textLower.includes('qual') ||
                textLower.includes('?') || textLower.includes('vc') ||
                textLower.includes('você');

            const isServiceRequest = textLower.includes('orçamento') || textLower.includes('orcamento') ||
                textLower.includes('quero') || textLower.includes('gostaria') ||
                textLower.includes('preciso') || textLower.includes('site') ||
                textLower.includes('website') || textLower.includes('tráfego') ||
                textLower.includes('análise') || textLower.includes('chatbot');

            if (!isQuestion && !isServiceRequest) {
                const name = text.replace(/\s+/g, ' ').trim();
                if (name && name.length <= 40 && name.split(' ').length <= 3) {
                    userName = name;
                    saveUserName(userName);
                    await pushAssistantWithTyping(messagesEl, pushMessage, `${userName}, que bom te conhecer! Posso te explicar como funciona a Elben e os serviços que prestamos, ou você tem interesse em um serviço específico?`);
                    setTimeout(() => showQuickReplies(messagesEl, input, form), 500);
                    return;
                }
            }

            // Se não for nome, pergunte o nome novamente
            await pushAssistantWithTyping(messagesEl, pushMessage, 'Qual é o seu nome?');
            return;
        }

        const alreadyRequested = loadContactRequested();

        if (!alreadyRequested && (looksLikeEmail(text) || looksLikePhone(text))) {
            saveContactRequested(true);

            // Extrair e enviar dados do cliente via Telegram
            const clientData = extractClientData(messages, text);
            await sendClientDataToTelegram(clientData);

            await pushAssistantWithTyping(messagesEl, pushMessage, '✅ Perfeito! Acabei de registrar seus dados com nossa equipe. O Paulo entrará em contato com você o quanto antes!');

            const interest = inferInterest(messages);
            pendingPostReply = followupForInterest(interest);
        }

        const lastUser = lastUserMessage(messages);

        if (isHumanHandoffIntent(lastUser)) {
            const whatsappUrl =
                'https://api.whatsapp.com/send/?phone=5548988167364&text=Ol%C3%A1%21+Gostaria+de+fazer+um+or%C3%A7amento+para+um+projeto&type=phone_number&app_absent=0';
            await pushAssistantWithTyping(
                messagesEl,
                pushMessage,
                `Claro! Você pode falar com o Paulo (humano da Elben) no telefone (48) 9 8816-7364 ou direto no WhatsApp <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">clicando aqui</a>.`,
                { isHtml: true }
            );
            return;
        }

        const budgetIntent = !alreadyRequested && isBudgetIntent(lastUser);

        if (budgetIntent) {
            const brief = inferBrief(messages);
            const needsBrief = !(brief.hasProjectType || brief.hasObjective);

            if (needsBrief) {
                await pushAssistantWithTyping(
                    messagesEl,
                    pushMessage,
                    'Claro! Para te dar um orçamento preciso, me conta um pouco mais sobre o que você está buscando. Qual serviço tem interesse?'
                );
            } else {
                await pushAssistantWithTyping(
                    messagesEl,
                    pushMessage,
                    'Perfeito! Já entendi o que você precisa. Me envie seu nome, nome da empresa, segmento, e-mail e WhatsApp para te passar o orçamento.'
                );
            }
            return;
        }

        if (!alreadyRequested && isCloseIntent(lastUser)) {
            saveContactRequested(true);

            // Extrair e enviar dados do cliente via Telegram se tiver dados de contato na mensagem
            if (looksLikeEmail(text) || looksLikePhone(text)) {
                const clientData = extractClientData(messages, text);
                await sendClientDataToTelegram(clientData);
                await pushAssistantWithTyping(messagesEl, pushMessage, '✅ Perfeito! Recebi todos os seus contatos e já avisei o Paulo que você tem interesse! Ele fala contigo em breve.');
                return;
            }

            await pushAssistantWithTyping(
                messagesEl,
                pushMessage,
                'Perfeito! Para eu encaminhar para o time e formalizar o próximo passo, me passe seu melhor e-mail ou WhatsApp, por gentileza? Vamos entrar em contato por WhatsApp para prosseguir!'
            );
            return;
        }

        const typingId = `typing_${Date.now()}`;
        try {
            const readDelayMs = 1000 + Math.floor(Math.random() * 1000);
            const minTypingMs = 900 + Math.floor(Math.random() * 700);

            const llmPromise = callAnna(messages);

            await sleep(readDelayMs);

            const typingShownAt = Date.now();
            messagesEl.appendChild(
                el('div', { class: 'anna-chat-row assistant', id: typingId }, [
                    el('div', { class: 'anna-chat-msg typing', text: 'Anna está digitando…' })
                ])
            );
            messagesEl.scrollTop = messagesEl.scrollHeight;

            const llmResult = await llmPromise;
            const reply = typeof llmResult === 'string' ? llmResult : llmResult.reply;
            const llmState = typeof llmResult === 'object' ? llmResult.state : {};

            const elapsed = Date.now() - typingShownAt;
            if (elapsed < minTypingMs) {
                await sleep(minTypingMs - elapsed);
            }

            const typing = document.getElementById(typingId);
            if (typing) typing.remove();

            // Integração estruturada do JSON (Gestão de Estado LLM)
            const wasRequested = loadContactRequested();
            if (!wasRequested && llmState && (llmState.phone || llmState.email) && llmState.lead_name) {
                saveContactRequested(true);
                const clientData = extractClientData(messages, llmState.phone || llmState.email || text);
                clientData.name = llmState.lead_name || clientData.name;
                clientData.interest = llmState.service || clientData.interest;
                if (llmState.phone) clientData.whatsapp = llmState.phone;
                if (llmState.email) clientData.email = llmState.email;
                if (llmState.company) clientData.company = llmState.company;

                await sendClientDataToTelegram(clientData);
            }

            const replyChunks = splitIntoChatChunks(reply);
            if (replyChunks.length) {
                pushMessage('assistant', replyChunks[0]);
                for (const chunk of replyChunks.slice(1)) {
                    await pushAssistantWithTyping(messagesEl, pushMessage, chunk, { readMinMs: 250, readMaxMs: 650, typeMinMs: 450 });
                }
            }

            if (pendingPostReply) {
                const next = pendingPostReply;
                pendingPostReply = '';
                await pushAssistantWithTyping(messagesEl, pushMessage, next, { readMinMs: 1200, readMaxMs: 2400, typeMinMs: 700 });
            }
        } catch (err) {
            await sleep(600);
            const typing = document.getElementById(typingId);
            if (typing) typing.remove();
            const details = formatChatError(err);
            const fallbackMsg = isCloseIntent(lastUser) || budgetIntent
                ? 'Tive um probleminha técnico aqui na agência. Mas não se preocupe, deixe o seu WhatsApp aqui que o Paulo fala com você em 5 minutos!'
                : (details
                    ? `Tive um problema para responder agora. Pode tentar de novo em alguns instantes? Se preferir, já me deixa o seu WhatsApp que eu peço pra minha equipe te chamar. (${details})`
                    : 'Tive um problema para responder agora. Pode me mandar o seu WhatsApp para contato, ou tentar de novo em alguns instantes?');
            pushMessage(
                'assistant',
                fallbackMsg
            );
            console.error(err);
        }
    });

    render();

    // Mostrar bubble inicial após 3 segundos
    setTimeout(() => {
        if (bubbleEl && !launcher.classList.contains('open')) {
            bubbleEl.classList.remove('hidden');
        }
    }, 3000);

    // Mudar mensagem do bubble após 15 segundos
    setTimeout(() => {
        if (bubbleEl && !launcher.classList.contains('open')) {
            bubbleEl.textContent = 'Posso te ajudar com alguma coisa?';
        }
    }, 15000);

    // Mudar mensagem do bubble após 45 segundos
    setTimeout(() => {
        if (bubbleEl && !launcher.classList.contains('open')) {
            bubbleEl.textContent = 'Qual é o seu nome?';
        }
    }, 45000);

    setTimeout(() => {
        if (!launcher.classList.contains('open')) {
            launcher.classList.add('nudge');
            setTimeout(() => launcher.classList.remove('nudge'), 4000);
        }
    }, 1200);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnnaChat);
} else {
    initAnnaChat();
}
