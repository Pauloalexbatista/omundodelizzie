# Roadmap - 3GWINE

Este documento regista as funcionalidades planeadas e o progresso do projeto.

## ✅ Concluído (Sessão Atual)

### 📞 Contactos & Localização

- [x] Atualizar morada, telefones e emails em todo o site.
- [x] Adicionar QR Codes das redes sociais na página de Contactos.
- [x] Corrigir PIN do mapa para a morada exata (Póvoa de Santa Iria).
- [x] Refatorizar estilos da página de contactos (CSS Modules).

## 🚀 Próximos Passos (Prioridade Alta)

### 🔐 1. Autenticação & Segurança

- **Proteger Admin**: Implementar login para aceder a `/admin`.
- **Middleware**: Redirecionar utilizadores não autenticados.
- **Supabase Auth**: Configurar autenticação via Email/Password.

### 📦 2. Gestão de Encomendas

- Criar tabelas `orders` e `order_items` na base de dados.
- Implementar fluxo básico de checkout (criar encomenda).
- Página de "Minhas Encomendas" para utilizadores.

### 💳 3. Sistema de Pagamentos

- **Stripe**: Implementar como processador principal.
  - Cartão de Crédito/Débito.
  - **MB Way** e **Multibanco** (via Stripe ou provider local).
- **PayPal**: Adicionar como opção alternativa.

---

## 🔮 Backlog Futuro

### 🌐 Funcionalidades Gerais

- Blog/Notícias sobre vinhos.
- Sistema de Reviews/Avaliações de vinhos.
- Programa de Fidelização.
