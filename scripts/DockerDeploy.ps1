<#
   Date: 22/09/2020
   Purpose: Deploy Script of DynamoDictionary
#>
$ErrorActionPreference = "Stop"

try
{	
	docker exec $env:DOCKER_CONTAINER pwsh -command "$env:DOCKER_WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\Deploy.ps1 -BucketName $env:BUCKETNAME -DistributionID $env:DISTRIBUTIONID -ContentRoot $env:DOCKER_WORKSPACE\build"

	if($LASTEXITCODE -ne 0)
	{
		throw "The AWS Deploy failed"
	}
}
catch
{
	Invoke-Expression -Command "$env:WORKSPACE\$env:COMMON_RESOURCES_DIR\scripts\PostDeploy.ps1"
	Write-Host $error[0]
	throw $LASTEXITCODE
}
