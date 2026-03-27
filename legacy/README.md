# 🎨 O Mundo de Lizzie

Website oficial para mostrar as pinturas artesanais em tecido e fraldas bordadas da Lizzie.

## ✨ Características

- **Design Clean e Fofinho** - Paleta de cores pastel (azul bebé, rosa claro, amarelo claro)
- **Galeria Otimizada** - Carregamento inteligente de imagens (12 de cada vez)
- **Totalmente Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- **Animações Suaves** - Transições elegantes e micro-animações
- **SEO Otimizado** - Meta tags para melhor visibilidade no Google
- **Redes Sociais** - Links diretos para Facebook e Instagram
- **Formulário de Contacto** - Validação e integração com email

## 🚀 Como Usar Localmente

1. **Abrir o site**
   - Simplesmente abra o ficheiro `index.html` no seu navegador
   - Ou use um servidor local (recomendado):
     ```bash
     # Se tiver Python instalado:
     python -m http.server 8000
     
     # Ou use a extensão "Live Server" no VS Code
     ```

2. **Visualizar**
   - Aceda a `http://localhost:8000` (se usar servidor local)
   - Ou clique duas vezes em `index.html`

## 📁 Estrutura do Projeto

```
PRJT OMundodeLizzie/
├── index.html          # Página principal
├── style.css           # Estilos e design system
├── script.js           # Funcionalidades interativas
├── Nova pasta/         # Pasta com as 46 imagens dos trabalhos
└── README.md           # Este ficheiro
```

## 🌐 Como Publicar Online (GitHub Pages)

### Opção 1: GitHub Pages (Grátis)

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - O Mundo de Lizzie"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/omundodelizzie.git
   git push -u origin main
   ```

2. **Ativar GitHub Pages**
   - Vá a Settings > Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Clique em Save

3. **Aceder ao site**
   - URL: `https://SEU-USUARIO.github.io/omundodelizzie`

### Opção 2: Netlify (Grátis e Mais Fácil)

1. **Criar conta em [Netlify](https://netlify.com)**
2. **Arrastar a pasta do projeto** para o Netlify Drop
3. **Pronto!** Site online em segundos
4. **Domínio personalizado** (opcional): Pode configurar `omundodelizzie.pt`

### Opção 3: Vercel (Grátis)

1. **Criar conta em [Vercel](https://vercel.com)**
2. **Importar projeto** do GitHub
3. **Deploy automático** a cada atualização

## 📝 Como Adicionar/Remover Imagens

1. **Adicionar novas imagens**:
   - Coloque as imagens na pasta `Nova pasta/`
   - Abra `script.js`
   - Adicione o nome do ficheiro ao array `imageFiles`

2. **Remover imagens**:
   - Remova o nome do ficheiro do array `imageFiles` em `script.js`

## 🎨 Personalização

### Alterar Cores
Edite as variáveis CSS em `style.css`:
```css
:root {
  --color-baby-blue: #A8D8EA;
  --color-pink: #FFB6C1;
  --color-yellow: #FFF4A3;
  /* ... */
}
```

### Alterar Textos
Edite diretamente em `index.html` nas secções:
- Hero (título e tagline)
- Sobre (descrição)
- Contacto (mensagens)

### Alterar Email de Contacto
Em `script.js`, linha ~220:
```javascript
window.location.href = `mailto:SEU-EMAIL@gmail.com?subject=${subject}&body=${body}`;
```

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design system com custom properties
- **JavaScript (Vanilla)** - Interatividade sem dependências
- **Google Fonts** - Quicksand & Poppins
- **Font Awesome** - Ícones das redes sociais

## 📱 Redes Sociais

- **Facebook**: [facebook.com/omundodelizzie](https://www.facebook.com/omundodelizzie)
- **Instagram**: [@o.mundo.de.lizzie](https://www.instagram.com/o.mundo.de.lizzie/)

## 💡 Otimizações Implementadas

- ✅ **Lazy Loading** - Imagens carregam apenas quando visíveis
- ✅ **Paginação** - Carrega 12 imagens de cada vez
- ✅ **Intersection Observer** - Animações eficientes
- ✅ **Mobile-First** - Design responsivo desde o início
- ✅ **Performance** - Site leve e rápido

## 📄 Licença

© 2024 O Mundo de Lizzie. Todos os direitos reservados.

---

**Feito com 💕 e muito carinho**
