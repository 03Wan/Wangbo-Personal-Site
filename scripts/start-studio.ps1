$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$port = 3000
$studioUrl = "http://localhost:$port/studio"

function Test-StudioAvailable {
  try {
    $response = Invoke-WebRequest -Uri $studioUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  }
  catch {
    return $false
  }
}

Set-Location $projectRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'npm was not found. Install Node.js LTS, then run this launcher again.'
}

if (-not (Test-Path (Join-Path $projectRoot 'node_modules'))) {
  Write-Host 'First run: installing project dependencies...'
  npm install
  if ($LASTEXITCODE -ne 0) {
    throw 'Dependency installation failed. Check the network and try again.'
  }
}

if (-not (Test-StudioAvailable)) {
  $listener = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
  if ($listener) {
    $owner = Get-Process -Id $listener[0].OwningProcess -ErrorAction SilentlyContinue
    $ownerName = if ($owner) { $owner.ProcessName } else { "PID $($listener[0].OwningProcess)" }
    throw "Port $port is in use by $ownerName and the Studio is unavailable. Release the port and try again."
  }

  Write-Host "Starting the website and data management Studio on port $port..."
  # Node does not use the system proxy by default. Enable the configured proxy
  # so the site can load published Sanity content on networks that block direct access.
  Start-Process -FilePath 'cmd.exe' -WorkingDirectory $projectRoot -ArgumentList @('/k', "set NODE_USE_ENV_PROXY=1&& npm run dev -- -p $port")

  $deadline = (Get-Date).AddSeconds(45)
  do {
    Start-Sleep -Milliseconds 750
    if (Test-StudioAvailable) {
      break
    }
  } while ((Get-Date) -lt $deadline)

  if (-not (Test-StudioAvailable)) {
    throw 'The Studio did not start within 45 seconds. Check the new command window for errors.'
  }
}

Write-Host 'The data management Studio is ready. Opening the browser...'
Start-Process $studioUrl
