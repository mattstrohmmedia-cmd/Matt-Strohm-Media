param(
    [Parameter(Mandatory)][string]$Client,
    [Parameter(Mandatory)][string]$Password,
    [string]$File
)

$dest = "public\clients\$Client"

# Use provided file or fall back to template
if (-not $File) {
    $File = "public\clients\_template\index.html"
}

if (-not (Test-Path $File)) {
    Write-Host "File not found: $File" -ForegroundColor Red
    exit 1
}

# Create client folder
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Copy file
Copy-Item $File "$dest\index.html" -Force

# Inject password
$content = Get-Content "$dest\index.html" -Raw -Encoding UTF8
$content = $content -replace "var PASSWORD = '[^']*';", "var PASSWORD = '$Password';"
Set-Content "$dest\index.html" $content -Encoding UTF8

# Deploy
git add "$dest/"
git commit -m "add client proposal: $Client"
git push

Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host "URL:       /clients/$Client" -ForegroundColor Cyan
Write-Host "Password:  $Password" -ForegroundColor Yellow
