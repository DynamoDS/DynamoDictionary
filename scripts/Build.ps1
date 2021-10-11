<#
   Date: 22/09/2020
   Purpose: Build inside container.
#>
[CmdletBinding()]
param (
    [Parameter()]
    [String]
    $WorkspacePath
)
$ErrorActionPreference = "Stop"

try
{
   #Copy npmrc with ADSK registry
   Copy-Item -Path $env:USERPROFILE\.npmrc -Destination $WorkspacePath -Force

   Set-Location $WorkspacePath

   npm ci --production

   if($LASTEXITCODE -ne 0)
   {
      throw "Installation Failed"
   }

   npm run build
      
   if($LASTEXITCODE -ne 0)
   {
      throw "Build Failed"
   }

   $indexPath = "$WorkspacePath\build\index.html"

   #Replacing static path to the 2 root folder
   (Get-Content -Path $indexPath) | ForEach-Object {$_ -Replace '/static/', '/2/static/'} | Set-Content -Path $indexPath
}
catch
{
	Write-Host $error[0]
	throw $LASTEXITCODE
}
