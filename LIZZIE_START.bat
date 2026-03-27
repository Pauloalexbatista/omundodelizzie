@echo off
SETLOCAL
title O Mundo de Lizzie - Gestão de Projecto

REM Ir para a pasta do projeto
cd /d "%~dp0"

echo ===================================================
echo   O MUNDO DE LIZZIE - PORTAL DE DESENVOLVIMENTO
echo ===================================================
echo.
echo [+] A abrir o Site em http://localhost:3000...
echo [+] A abrir o Admin em http://localhost:3000/admin...
echo.

REM Abre o site e o admin
start http://localhost:3000
start http://localhost:3000/admin

echo [+] A iniciar o servidor Next.js na porta 3000...
echo [+] (Mantenha esta janela aberta enquanto testa o site)
echo.

REM IMPORTANTE: Usar 'call' no Windows para evitar que o script feche prematuramente
call npm run dev -- -p 3000

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Ocorreu um erro ao iniciar o servidor.
    echo [!] Certifique-se que o Node.js esta instalado e as dependencias carregadas.
    echo.
    pause
)
