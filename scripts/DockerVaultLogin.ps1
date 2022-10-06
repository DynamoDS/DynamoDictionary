<#
   Date: 09/12/2019
   Purpose: Post Build Script of DynamoPrimer
#>
$ErrorActionPreference = "Stop"

try
{
	docker exec $env:DOCKER_CONTAINER pwsh -command "$env:DOCKER_WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\VaultLogin.ps1 $env:SA_USERNAME $env:SA_PASSWORD"
	
	if($LASTEXITCODE -ne 0)
	{
	   throw "The Vaullt login failed"
	}
}
catch
{
	Invoke-Expression -Command "$env:WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\PostDeployScript.ps1"
	Write-Host $error[0]
	throw $LASTEXITCODE
}
