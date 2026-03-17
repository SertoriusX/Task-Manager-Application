@echo off
echo ========================================
echo   Deploy FRONTEND to Azure
echo ========================================
echo.

echo Step 1: Login to Azure...
call az login

echo.
echo Step 2: Create Frontend Web App...
call az webapp create --name taskmanager-app --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "NODE|18-lts" 2>nul

echo.
echo Step 3: Install dependencies...
cd /d "%~dp0Frontend"
call npm install

echo.
echo Step 4: Build Angular app...
call npx ng build --configuration=production

echo.
echo Step 5: Deploy to Azure...
cd /d "%~dp0Frontend\dist\TaskManager\browser"
call az webapp up --name taskmanager-app --resource-group TaskManagerRG --runtime "NODE|18-lts" --html

echo Step 6: Start Frontend...
call az webapp start --name taskmanager-app --resource-group TaskManagerRG

echo.
echo ========================================
echo   FRONTEND DEPLOYED!
echo ========================================
echo.
echo Frontend URL: https://taskmanager-app.azurewebsites.net
echo.
echo IMPORTANT: Update API URL in environment.prod.ts if needed
echo.

cd /d "%~dp0"
pause
