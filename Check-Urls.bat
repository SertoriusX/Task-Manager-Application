@echo off
echo ========================================
echo   Manual ZIP Deploy to Azure
echo ========================================
echo.

echo Deploying FRONTEND...
echo.

echo Step 1: Get Frontend upload URL...
for /f "delims=" %%i in ('az staticwebapp show —name taskmanager-app —resource-group TaskManagerRG —query "defaultHostname" —output tsv') do echo Frontend URL: https://%%i

echo.
echo To deploy Frontend manually:
echo 1. Go to Azure Portal
echo 2. Find Static Web App "taskmanager-app" 
echo 3. Click "Deployment" ^> "GitHub"
echo 4. Authorize and select your repo
echo.
echo OR use ZIP Deploy:
echo 1. Go to "taskmanager-app" in Portal
echo 2. Click "Deployment Center" ^> "ZIP Deploy"
echo 3. Upload: Frontend-deploy.zip

echo.
echo ========================================
echo   Current App URLs:
echo ========================================
echo.
echo Frontend: https://green-bay-06485a50f.2.azurestaticapps.net
echo Backend:  https://taskmanager-api.ashysmoke-2cd7dbc3.eastus.azurecontainerapps.io
echo.

pause
