@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Azure Deployment - One Click
echo   Task Manager Application
echo ========================================
echo.

echo Step 1: Checking Azure CLI...
az --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Azure CLI not found!
    echo Please install Azure CLI from:
    echo https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
    echo.
    pause
    exit /b 1
)

echo Step 2: Logging into Azure...
call az login

echo.
echo Step 3: Creating Resource Group...
call az group create --name TaskManagerRG --location eastus 2>nul

echo.
echo Step 4: Creating App Service Plan (FREE)...
call az appservice plan create --name TaskManagerPlan --resource-group TaskManagerRG --sku FREE 2>nul

echo.
echo ========================================
echo   DEPLOYING BACKEND (ASP.NET Core)
echo ========================================

echo Step 5: Creating Backend Web App...
call az webapp create --name taskmanager-api --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "DOTNET|8.0" 2>nul

echo Step 6: Building Backend...
cd /d "%~dp0Backend"
call dotnet publish -c Release -o ..\publish-backend
cd /d "%~dp0"

echo Step 7: Deploying Backend...
az webapp deployment source config-local-git --name taskmanager-api --resource-group TaskManagerRG >nul 2>&1
for /f "delims=" %%i in ('az webapp deployment source show --resource-group TaskManagerRG --name taskmanager-api --query deploymentToken --output tsv 2^>nul') do set DEPLOY_TOKEN=%%i

cd /d "%~dp0publish-backend"
git init >nul 2>&1
git add . >nul 2>&1
git -c user.email="deploy@azure" -c user.name="Azure Deploy" commit -m "Deploy" >nul 2>&1
git remote add azure-scm https://%DEPLOY_TOKEN%@taskmanager-api.scm.azurewebsites.net/taskmanager-api.git 2>nul
git push azure-scm master --force 2>nul
cd /d "%~dp0"

echo.
echo ========================================
echo   DEPLOYING FRONTEND (Angular)
echo ========================================

echo Step 8: Building Angular App...
cd /d "%~dp0Frontend"
call npm install 2>nul
call npx ng build --configuration=production 2>nul
cd /d "%~dp0"

echo Step 9: Creating Frontend Web App...
call az webapp create --name taskmanager-app --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "NODE|18-lts" 2>nul

echo Step 10: Deploying Frontend...
cd /d "%~dp0Frontend\dist\TaskManager\browser"
if exist "index.html" (
    az webapp up --name taskmanager-app --resource-group TaskManagerRG --runtime "NODE|18-lts" --html 2>nul
) else (
    echo ERROR: Angular build not found!
)

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo ^> Backend API: https://taskmanager-api.azurewebsites.net
echo ^> Frontend App: https://taskmanager-app.azurewebsites.net
echo.
echo IMPORTANT: Update API in Azure if needed
echo.

cd /d "%~dp0"
pause
