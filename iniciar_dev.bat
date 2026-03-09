@echo off
REM Iniciar servidor de desenvolvimento 3GWINE automaticamente
echo ====================================
echo   3GWINE - Iniciando Servidor...
echo ====================================
echo.

cd /d "C:\Users\paulo\.gemini\antigravity\playground\core-omega\PRJT_3GWine"

echo Diretorio: %CD%
echo.
echo Abrindo http://localhost:3000 no navegador...
echo.

REM Aguardar 3 segundos e depois abrir o browser
start "" cmd /c "timeout /t 3 /nobreak && start http://localhost:3000"

REM Iniciar o servidor de desenvolvimento
npm run dev
