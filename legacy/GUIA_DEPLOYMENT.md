# 🚀 Guia de Deployment - O Mundo de Lizzie

## 📧 PASSO 1: Configurar Email de Contacto

### Opção A: Formspree (Recomendado - Grátis)

1. **Criar conta em [Formspree.io](https://formspree.io)**
   - Grátis até 50 emails/mês
   - Emails vão direto para o teu email

2. **Obter o endpoint do formulário**
   - Depois de criar conta, vais receber um URL tipo: `https://formspree.io/f/XXXXXXXX`

3. **Atualizar o formulário**
   - Abrir `index.html`
   - Encontrar a linha: `<form class="contact-form fade-in" id="contactForm">`
   - Substituir por:
   ```html
   <form class="contact-form fade-in" action="https://formspree.io/f/XXXXXXXX" method="POST">
   ```
   - **Remover** ou comentar a linha no `script.js` que tem `contactForm.addEventListener`

### Opção B: Mailto (Atual - Simples mas limitado)

1. **Abrir `script.js`**
2. **Encontrar linha ~220:** `window.location.href = \`mailto:omundodelizzie@gmail.com?subject=...`
3. **Substituir** `omundodelizzie@gmail.com` pelo **teu email real**

---

## 🌐 PASSO 2: Colocar Online com Netlify (MAIS FÁCIL!)

### Por que Netlify?
- ✅ **100% Grátis**
- ✅ **Arrastar e largar** (super fácil!)
- ✅ **HTTPS automático**
- ✅ **Domínio grátis** (.netlify.app)
- ✅ **Pode adicionar domínio personalizado** depois

### Passos:

1. **Ir para [Netlify.com](https://netlify.com)**
   - Clicar em "Sign up" (criar conta grátis)
   - Pode usar conta Google/GitHub

2. **Deploy do Site**
   - Depois de fazer login, clicar em **"Add new site"** → **"Deploy manually"**
   - **Arrastar a pasta** `PRJT OMundodeLizzie` inteira para a área de drop
   - Aguardar 30 segundos... 🎉 **SITE ONLINE!**

3. **Teu site estará em:**
   - `https://random-name-12345.netlify.app`
   - Podes mudar o nome depois!

4. **Mudar o nome do site (opcional)**
   - No dashboard do Netlify
   - Ir a **"Site settings"** → **"Change site name"**
   - Escolher: `omundodelizzie` 
   - Novo URL: `https://omundodelizzie.netlify.app` 🎉

---

## 🌐 ALTERNATIVA: GitHub Pages

### Se preferires GitHub:

1. **Criar conta no [GitHub.com](https://github.com)**

2. **Criar novo repositório**
   - Nome: `omundodelizzie`
   - Público
   - Sem README

3. **Fazer upload dos ficheiros**
   - Clicar em "uploading an existing file"
   - Arrastar TODOS os ficheiros:
     - `index.html`
     - `style.css`
     - `script.js`
     - `crown-icon.png`
     - Pasta `Nova pasta` (com as imagens)
   - Commit changes

4. **Ativar GitHub Pages**
   - Ir a **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)**
   - Save

5. **Aguardar 2-3 minutos**
   - Site estará em: `https://SEU-USERNAME.github.io/omundodelizzie`

---

## 🎯 PASSO 3: Domínio Personalizado (Opcional)

### Se quiseres `omundodelizzie.pt` ou `.com`:

1. **Comprar domínio**
   - [GoDaddy](https://godaddy.com) (~10-15€/ano)
   - [Namecheap](https://namecheap.com)
   - [Cloudflare](https://cloudflare.com) (mais barato!)

2. **Configurar no Netlify**
   - Dashboard → **Domain settings** → **Add custom domain**
   - Seguir instruções (mudar DNS)

---

## 📝 Checklist Antes de Publicar

- [ ] Atualizar email no formulário (Formspree ou mailto)
- [ ] Verificar se todas as imagens carregam
- [ ] Testar links Facebook e Instagram
- [ ] Testar em mobile (redimensionar browser)
- [ ] Verificar se o formulário funciona

---

## 🆘 Precisa de Ajuda?

### Problemas Comuns:

**Imagens não aparecem:**
- Verificar se a pasta `Nova pasta` foi incluída no upload
- Caminhos devem ser relativos: `Nova pasta/imagem.jpg`

**Formulário não funciona:**
- Se usar Formspree: verificar se o endpoint está correto
- Se usar mailto: alguns browsers bloqueiam

**Site não atualiza:**
- Netlify: fazer novo deploy (arrastar pasta novamente)
- GitHub Pages: aguardar 5 minutos após commit

---

## 🎉 Próximos Passos Após Publicar

1. **Partilhar o link** nas redes sociais
2. **Adicionar link** na bio do Instagram
3. **Atualizar descrição** do Facebook com o link
4. **Testar formulário** enviando mensagem de teste

---

**Boa sorte! O site está fantástico! 🎨✨**

Se tiveres dúvidas durante o processo, estou aqui para ajudar! 💕
