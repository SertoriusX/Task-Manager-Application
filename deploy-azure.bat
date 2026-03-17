@echo off
echo ========================================
echo   Azure Deployment Script
echo   Task Manager Application
echo ========================================
echo.

REM Check if Azure CLI is installed
az --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Azure CLI is not installed.
    echo Please install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
    pause
    exit /b 1
)

echo Step 1: Logging in to Azure...
call az login

echo.
echo Step 2: Creating Resource Group...
call az group create --name TaskManagerRG --location eastus

echo.
echo Step 3: Creating App Service Plan (Free)...
call az appservice plan create --name TaskManagerPlan --resource-group TaskManagerRG --sku FREE

echo.
echo ========================================
echo   DEPLOYING BACKEND (ASP.NET Core)
echo ========================================

echo Step 4: Creating Backend Web App...
call az webapp create --name taskmanager-api --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "DOTNET|8.0"

echo Step 5: Publishing Backend...
cd Backend
dotnet publish -c Release -o ../publish-backend
cd ..

echo Step 6: Deploying Backend to Azure...
az webapp deployment source config-local-git --name taskmanager-api --resource-group TaskManagerRG
for /f "delims=" %%i in ('az webapp deployment source show --resource-group TaskManagerRG --name taskmanager-api --query deploymentToken --output tsv') do set DEPLOY_TOKEN=%%i
cd publish-backend
git remote add azure-scm https://%DEPLOY_TOKEN%@taskmanager-api.scm.azurewebsites.net/taskmanager-api.git
git push azure-scm master --force
cd ..

echo.
echo ========================================
echo   DEPLOYING FRONTEND (Angular)
echo ========================================

echo Step 7: Building Angular App...
cd Frontend
call npm install
call ng build --configuration=production
cd ..

echo Step 8: Creating Frontend Web App...
call az webapp create --name taskmanager-app --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "NODE|18-lts"

echo Step 9: Deploying Frontend to Azure...
cd Frontend\dist\TaskManager\browser
call az webapp up --name taskmanager-app --resource-group TaskManagerRG --runtime "NODE|18-lts"
cd ../../..

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Backend API: https://taskmanager-api.azurewebsites.net
echo Frontend App: https://taskmanager-app.azurewebsites.net
echo.
echo IMPORTANT: Update Frontend API URL in:
echo   Frontend\src\environment\environment.ts
echo.
echo Run: az webapp log tail --name taskmanager-api --resource-group TaskManagerRG
echo.

pause
