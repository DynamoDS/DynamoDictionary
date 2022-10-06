<#
   Date: 09/12/2019
   Purpose: Post Build Script of DynamoPrimer
#>
$ErrorActionPreference = "Stop"

try
{
	docker exec $env:DOCKER_CONTAINER pwsh -command "$env:DOCKER_WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\VaultLogin.ps1 $env:ADS_USER_NAME $env:ADS_USER_PASSWORD"
	
	if($LASTEXITCODE -ne 0)
	{
	   throw "The Vaullt login failed"
	}
}
catch
{
	Invoke-Expression -Command "$env:WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\PostDeploy.ps1"
	Write-Host $error[0]
	throw $LASTEXITCODE
}
