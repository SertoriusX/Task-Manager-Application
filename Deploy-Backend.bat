@echo off
echo ========================================
echo   Deploy BACKEND to Azure
echo ========================================
echo.

echo Step 1: Login to Azure...
call az login

echo.
echo Step 2: Create Resource Group...
call az group create --name TaskManagerRG --location eastus 2>nul

echo.
echo Step 3: Create App Service Plan (FREE)...
call az appservice plan create --name TaskManagerPlan --resource-group TaskManagerRG --sku FREE 2>nul

echo.
echo Step 4: Create Backend Web App...
call az webapp create --name taskmanager-api --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "DOTNET|8.0" 2>nul

echo.
echo Step 5: Build Backend...
cd /d "%~dp0Backend"
call dotnet publish -c Release -o ..\publish-backend

echo.
echo Step 6: Deploy to Azure...
cd /d "%~dp0publish-backend"
git init 2>nul
git add . 2>nul
git -c user.email="deploy@azure" -c user.name="Azure" commit -m "deploy" 2>nul

for /f "delims=" %%i in ('az webapp deployment source show --resource-group TaskManagerRG --name taskmanager-api --query deploymentToken --output tsv 2^>nul') do set TOKEN=%%i
git remote add azure https://%TOKEN%@taskmanager-api.scm.azurewebsites.net/taskmanager-api.git 2>nul
git push azure master --force 2>nul

echo Step 7: Start Backend...
call az webapp start --name taskmanager-api --resource-group TaskManagerRG

echo.
echo ========================================
echo   BACKEND DEPLOYED!
echo ========================================
echo.
echo API URL: https://taskmanager-api.azurewebsites.net
echo.

cd /d "%~dp0"
pause
