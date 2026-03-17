@echo off
echo ========================================
echo   Setup GitHub Secrets for Azure
echo ========================================
echo.

echo Step 1: Create Azure Service Principal...
echo Run this in PowerShell:

echo.
echo Copy and run this in PowerShell:
echo ========================================
echo.
echo az ad sp create-for-rbac --name "GitHub-Azure-Action" --role contributor --scopes /subscriptions/06eee489-f468-4616-a973-abe4ed5dc779/resourceGroups/TaskManagerRG --sdk-auth
echo.
echo Then copy the JSON output and add it as a secret named AZURE_CREDENTIALS in GitHub.
echo.
echo Step 2: Get Static Web App Token...
echo Go to Azure Portal -^> Static Web App -^> Deployment Token
echo Add this as secret: AZURE_STATIC_WEB_APPS_TOKEN
echo.
echo For help: https://github.com/Azure/static-web-apps-deploy/blob/main/action.yml
echo.

pause
