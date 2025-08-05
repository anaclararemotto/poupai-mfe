# Poup.ai - Micro Frontend (MFE)

Este repositório representa o **MFE** que compõem a aplicação Poup.ai. Este MFE é carregado pelo Shell principal usando **Native Federation**.

---

## 🚀 Tecnologias

- Angular 20
- Module Federation via `@angular-architects/native-federation`
- Bootstrap 5 + Bootstrap Icons
- Chart.js + ng2-charts (visualizações)
- Docker / Docker Compose

---

## 🧩 Integração com Shell

Este MFE é carregado dinamicamente pelo Shell via `federation.config.js`.  
Deve ser exposto na porta `4201` ou conforme definido no Docker Compose.

---

## ⚙️ Como Rodar Localmente

### ✅ Pré-requisitos

- Node.js `>=18.x`
- Docker + Docker Compose
- Angular CLI:

```bash
npm install -g @angular/cli
```

### ▶️ Rodar via Docker Compose
1. Clone todos os repositórios envolvidos (shell e MFEs)
2. No diretório do docker-compose.yml, execute:
```bash
docker compose up --build
```
3. O MFE estará acessível via http://localhost:4201

### ▶️ Rodar localmente sem Docker
```bash
npm install
ng serve
```
> Obs: Certifique-se de que o Shell também esteja rodando para integração.
---
## 📁 Estrutura
- `federation.config.js` — Define os módulos expostos
- `webpack.config.js` — Configuração para Native Federation
- `app.routes.ts` — Define as rotas locais do MFE
---
## 📦 Dependências Adicionais
- `chart.js`
- `ng2-charts`
- `ngx-mask`
- `jwt-decode`

---

## 🤝 Contribuições
Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues com sugestões ou problemas, ou enviar pull requests com melhorias.
















