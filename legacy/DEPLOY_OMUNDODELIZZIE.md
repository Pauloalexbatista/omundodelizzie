# 🚀 Deploy do Site - omundodelizzie.com

## ✅ O QUE JÁ TENS:
- ✅ Site completo e funcional
- ✅ Domínio a comprar: `omundodelizzie.com` (GoDaddy - trocar na 2ª feira)
- ✅ Email configurado: `betamcbatista@hotmail.com`

---

## 📋 PASSO A PASSO - NETLIFY + GODADDY

### **PARTE 1: Fazer Deploy no Netlify (5 minutos)**

1. **Ir para [app.netlify.com](https://app.netlify.com)**
   - Clicar em **"Sign up"** (criar conta grátis)
   - Pode usar Google, GitHub ou Email

2. **Depois de fazer login:**
   - Clicar no botão **"Add new site"**
   - Escolher **"Deploy manually"**

3. **Fazer Upload:**
   - **ARRASTAR** a pasta completa `PRJT OMundodeLizzie` para a área
   - Incluir TUDO:
     - `index.html`
     - `style.css`
     - `script.js`
     - `crown-icon.png`
     - Pasta `Nova pasta` (com as 46 imagens)
   - Aguardar 30-60 segundos... 🎉

4. **Site Online!**
   - Netlify vai dar um URL temporário tipo: `https://random-name-123.netlify.app`
   - **TESTAR o site** nesse URL antes de continuar!

---

### **PARTE 2: Ligar o Domínio GoDaddy (10 minutos)**

#### **No Netlify:**

1. **No dashboard do teu site:**
   - Clicar em **"Domain settings"** (menu lateral)
   - Clicar em **"Add custom domain"**

2. **Adicionar domínio:**
   - Escrever: `omundodelizzie.com`
   - Clicar em **"Verify"**
   - Netlify vai dizer que não és o dono (é normal!)
   - Clicar em **"Add domain"** na mesma

3. **Configurar DNS:**
   - Netlify vai mostrar 2 opções:
     - **Opção A:** Usar Netlify DNS (mais fácil)
     - **Opção B:** Usar GoDaddy DNS
   
   **Escolhe Opção A (Netlify DNS)** - é mais simples!

4. **Copiar os Nameservers:**
   - Netlify vai mostrar 4 nameservers tipo:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - **COPIAR** estes 4 (vais precisar deles!)

#### **No GoDaddy:**

1. **Ir para [godaddy.com](https://godaddy.com) e fazer login**

2. **Ir para "My Products":**
   - Clicar em **"Domains"**
   - Encontrar `omundodelizzie.com`
   - Clicar nos **3 pontinhos** (⋮) → **"Manage DNS"**

3. **Mudar Nameservers:**
   - Scroll down até **"Nameservers"**
   - Clicar em **"Change"**
   - Escolher **"I'll use my own nameservers"** ou **"Custom"**

4. **Colar os Nameservers do Netlify:**
   - Apagar os nameservers da GoDaddy
   - Colar os 4 do Netlify (um em cada campo)
   - Clicar em **"Save"**

5. **Confirmar:**
   - GoDaddy vai avisar que pode demorar 24-48h
   - Clicar em **"Continue"** ou **"Yes"**

---

### **PARTE 3: Aguardar Propagação**

- ⏰ **Tempo normal:** 2-6 horas
- ⏰ **Máximo:** 24-48 horas

**Como verificar:**
- Ir a `omundodelizzie.com` no browser
- Se aparecer o site → **FUNCIONOU!** 🎉
- Se der erro → aguardar mais um pouco

---

## 🔒 HTTPS (Certificado SSL)

O Netlify **ativa HTTPS automaticamente** (grátis!) depois do domínio propagar.

Podes verificar em:
- Netlify → Domain settings → **HTTPS**
- Deve dizer: **"Your site has HTTPS enabled"**

---

## ✅ CHECKLIST FINAL

Antes de partilhar o site:

- [ ] Site funciona em `omundodelizzie.com`
- [ ] Todas as imagens aparecem
- [ ] Links Facebook e Instagram funcionam
- [ ] Formulário de contacto abre email
- [ ] Site funciona em mobile (testar no telemóvel)
- [ ] HTTPS ativo (cadeado verde no browser)

---

## 🎉 DEPOIS DE ONLINE

1. **Partilhar nas redes sociais:**
   - Facebook: Adicionar link na descrição
   - Instagram: Adicionar link na bio

2. **Testar formulário:**
   - Preencher e enviar mensagem de teste
   - Verificar se chega ao email `betamcbatista@hotmail.com`

3. **Monitorizar:**
   - Netlify mostra estatísticas de visitantes (grátis!)

---

## 📞 LEMBRETE PARA 2ª FEIRA

**Contactar GoDaddy para trocar o domínio:**
- De: `omundodelizzy.com` (com Y - ERRADO)
- Para: `omundodelizzie.com` (com IE - CORRETO)

**Como fazer:**
1. Ir a [godaddy.com/help](https://godaddy.com/help)
2. Contactar suporte (chat ou telefone)
3. Dizer: "Comprei omundodelizzy.com mas queria omundodelizzie.com. Posso trocar?"
4. Prazo: Fazer nos primeiros 5 dias (troca grátis!)

---

## 🆘 PROBLEMAS COMUNS

**Site não aparece após 24h:**
- Verificar se os nameservers estão corretos no GoDaddy
- Contactar suporte Netlify (chat grátis)

**Imagens não aparecem:**
- Verificar se a pasta `Nova pasta` foi incluída no upload
- Fazer novo deploy no Netlify

**Formulário não funciona:**
- Verificar se o browser permite abrir mailto links
- Testar em browser diferente

---

## 📞 SUPORTE

- **Netlify:** Chat ao vivo (grátis) - [netlify.com/support](https://netlify.com/support)
- **GoDaddy:** Suporte em português - telefone no site

---

**Boa sorte! O site está incrível! 🎨✨**

Qualquer dúvida, estou aqui! 💕
