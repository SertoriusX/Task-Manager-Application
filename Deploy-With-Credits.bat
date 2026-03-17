@echo off
echo ========================================
echo   AZURE DEPLOYMENT (With Free Credits)
echo ========================================
echo.

echo Step 1: Login to Azure...
call az login

echo.
echo Step 2: Create App Service Plan (B1 - uses free credits)...
call az appservice plan create --name TaskManagerPlan --resource-group TaskManagerRG --sku B1 --location eastus

echo.
echo Step 3: Create Backend Web App...
call az webapp create --name taskmanager-api --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "DOTNET:8"

echo.
echo Step 4: Create Frontend Web App...
call az webapp create --name taskmanager-app --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "NODE:18-lts"

echo.
echo Step 5: Build and Deploy BACKEND...
cd /d "%~dp0Backend"
call dotnet publish -c Release -o ..\publish-backend
cd /d "%~dp0publish-backend"
git init 2>nul
git add . 2>nul
git -c user.email="deploy@azure" -c user.name="Azure" commit -m "deploy" 2>nul
for /f "delims=" %%i in ('az webapp deployment source show --resource-group TaskManagerRG --name taskmanager-api --query deploymentToken --output tsv') do set TOKEN=%%i
git remote add azure https://%TOKEN%@taskmanager-api.scm.azurewebsites.net/taskmanager-api.git 2>nul
git push azure master --force

echo.
echo Step 6: Build and Deploy FRONTEND...
cd /d "%~dp0Frontend"
call npm install
call npx ng build --configuration=production
cd /d "%~dp0Frontend\dist\TaskManager\browser"
call az webapp up --name taskmanager-app --resource-group TaskManagerRG --runtime "NODE:18-lts" --html

echo.
echo Step 7: Start Apps...
call az webapp start --name taskmanager-api --resource-group TaskManagerRG
call az webapp start --name taskmanager-app --resource-group TaskManagerRG

echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo ^> Backend:  https://taskmanager-api.azurewebsites.net
echo ^> Frontend: https://taskmanager-app.azurewebsites.net

pause
