# Meus Gastos (PWA)

Arquivos: `index.html` (app inteiro), `manifest.json`, `sw.js`, `icons/`.
Suba **todos juntos, mantendo a pasta `icons/`**. O app precisa de HTTPS (todas as hospedagens abaixo já oferecem).

## Hospedar de graça

**Netlify Drop (mais rápido, sem conta de programador)**
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `gastos-pwa` inteira para a página.
3. Copie o endereço gerado (algo como `https://nome-aleatorio.netlify.app`).

**GitHub Pages**
1. Crie um repositório público e envie os arquivos (botão *Add file > Upload files*).
2. *Settings > Pages > Branch: main / (root) > Save*.
3. Endereço: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

(Cloudflare Pages e Vercel também funcionam do mesmo jeito.)

## Instalar no iPhone
1. Abra o endereço no **Safari** (precisa ser o Safari).
2. Toque em **Compartilhar** (quadrado com seta) > **Adicionar à Tela de Início** > **Adicionar**.
3. Abra pelo ícone novo: funciona em tela cheia e offline.

## Importante
- Os dados ficam só no aparelho (localStorage). Se apagar o app ou os dados do Safari, eles somem: use **Ajustes > Exportar backup** de vez em quando.
- Para publicar uma atualização, altere `CACHE = 'gastos-v1'` em `sw.js` (ex.: `gastos-v2`).
