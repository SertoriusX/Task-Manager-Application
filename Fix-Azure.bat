@echo off
echo ========================================
echo   Fix Azure Deployment
echo ========================================
echo.

echo Checking existing resources...
call az webapp list --resource-group TaskManagerRG --output table 2>nul

echo.
echo Creating Backend if not exists...
call az webapp create --name taskmanager-api --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "DOTNET|8.0" 2>nul
call az webapp start --name taskmanager-api --resource-group TaskManagerRG 2>nul

echo.
echo Creating Frontend if not exists...
call az webapp create --name taskmanager-app --resource-group TaskManagerRG --plan TaskManagerPlan --runtime "NODE|18-lts" 2>nul
call az webapp start --name taskmanager-app --resource-group TaskManagerRG 2>nul

echo.
echo Starting all apps...
call az webapp start --name taskmanager-api --resource-group TaskManagerRG 2>nul
call az webapp start --name taskmanager-app --resource-group TaskManagerRG 2>nul

echo.
echo ========================================
echo   Apps Status
echo ========================================
call az webapp list --resource-group TaskManagerRG --query "[].{Name:name, State:state}" --output table 2>nul

echo.
echo URLs:
echo Backend:  https://taskmanager-api.azurewebsites.net
echo Frontend: https://taskmanager-app.azurewebsites.net

pause
