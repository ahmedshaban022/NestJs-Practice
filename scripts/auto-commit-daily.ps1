<#
    Daily auto-commit churn for NestJs-Practice.

    Creates a random number of commits (20..40) per run, each one a small,
    reversible change (one appended line in ACTIVITY.md), then pushes the
    branch to origin.

    The script is idempotent per calendar day: a marker file records the
    last successful run, so a second trigger on the same day is a no-op.

    Usage:
      powershell -NoProfile -ExecutionPolicy Bypass -File auto-commit-daily.ps1
      powershell -NoProfile -ExecutionPolicy Bypass -File auto-commit-daily.ps1 -Force
#>
[CmdletBinding()]
param(
    [switch]$Force,
    [int]$MinCommits = 20,
    [int]$MaxCommits = 40
)

$ErrorActionPreference = 'Stop'
$ProgressPreference    = 'SilentlyContinue'

$RepoRoot  = Split-Path -Parent $PSScriptRoot
$Activity  = Join-Path $RepoRoot 'ACTIVITY.md'
$Marker    = Join-Path $PSScriptRoot 'last-run.txt'
$LogFile   = Join-Path $PSScriptRoot 'auto-commit.log'
$Branch    = 'master'
$Remote    = 'origin'
$GitName   = 'Ahmed Shaban'
$GitEmail  = '77107952+ahmedshaban022@users.noreply.github.com'

function Write-Log {
    param([string]$Message)
    $line = '{0} {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Invoke-Git {
    param([string[]]$GitArgs)

    # Run git with stderr captured separately, so stdout stays clean and
    # parseable (git emits harmless warnings like "LF will be replaced by
    # CRLF" on stderr, which would otherwise corrupt parsed output).
    $errFile = [System.IO.Path]::GetTempFileName()
    $prev = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $out = & git -C $RepoRoot @GitArgs 2> $errFile
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $prev
        $errText = ''
        if (Test-Path $errFile) {
            $errText = (Get-Content $errFile -Raw -ErrorAction SilentlyContinue)
            Remove-Item $errFile -Force -ErrorAction SilentlyContinue
        }
    }

    if ($code -ne 0) {
        throw ("git {0} failed ({1}): {2}{3}" -f ($GitArgs -join ' '), $code, (($out | ForEach-Object { $_.ToString() }) -join "`n"), $errText)
    }

    # Always return a single string, so callers can safely call .Trim() on it
    # even when git produced no output.
    return (($out | ForEach-Object { $_.ToString() }) -join "`n")
}

Set-Location $RepoRoot
Write-Log "=== daily auto-commit start (repo: $RepoRoot) ==="

# ---------------------------------------------------------------- guard: once per day
$today = (Get-Date).ToString('yyyy-MM-dd')
if (-not $Force -and (Test-Path $Marker)) {
    $last = (Get-Content $Marker -Raw).Trim()
    if ($last -eq $today) {
        Write-Log "already ran today ($today); skipping."
        exit 0
    }
}

# ---------------------------------------------------------------- sanity: repo state
if (-not (Test-Path (Join-Path $RepoRoot '.git'))) {
    Write-Log "ERROR: not a git repository: $RepoRoot"
    exit 1
}

Invoke-Git @('config', 'user.name',  $GitName)  | Out-Null
Invoke-Git @('config', 'user.email', $GitEmail) | Out-Null

$branch = (Invoke-Git @('rev-parse', '--abbrev-ref', 'HEAD')).Trim()
if ($branch -ne $Branch) {
    Write-Log "ERROR: HEAD is on '$branch', expected '$Branch'."
    exit 1
}

# Only block on states where committing is genuinely unsafe (in-progress
# merge/rebase/cherry-pick, or conflicted paths). Ordinary uncommitted work
# in other files is left untouched: this script only ever stages
# ACTIVITY.md, so it never sweeps unrelated changes into its commits.
$unmerged = (Invoke-Git @('diff', '--name-only', '--diff-filter=U')).Trim()
if ($unmerged) {
    Write-Log "ERROR: unresolved merge conflicts; refusing to commit."
    Write-Log $unmerged
    exit 1
}

foreach ($state in @('MERGE_HEAD', 'REBASE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD')) {
    if (Test-Path (Join-Path $RepoRoot ".git\$state")) {
        Write-Log "ERROR: $state is present; refusing to commit during an unfinished git operation."
        exit 1
    }
}

# ---------------------------------------------------------------- pick the churn count
$count = Get-Random -Minimum $MinCommits -Maximum ($MaxCommits + 1)
Write-Log "creating $count commits"

# ---------------------------------------------------------------- make the commits
$stamp = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss')
for ($i = 1; $i -le $count; $i++) {
    $line = "- {0} - auto activity entry #{1} of {2}" -f $stamp, $i, $count

    if (-not (Test-Path $Activity)) {
        Set-Content -Path $Activity -Value "# Activity`n" -Encoding UTF8
    }
    Add-Content -Path $Activity -Value $line -Encoding UTF8

    Invoke-Git @('add', 'ACTIVITY.md') | Out-Null
    Invoke-Git @('commit', '-m', ("chore: daily activity entry {0}/{1}" -f $i, $count)) | Out-Null
    Write-Log ("committed {0}/{1}" -f $i, $count)
}

# ---------------------------------------------------------------- push (with retries)
$pushed = $false
for ($attempt = 1; $attempt -le 5 -and -not $pushed; $attempt++) {
    try {
        Invoke-Git @('push', $Remote, $Branch) | Out-Null
        $pushed = $true
        Write-Log "pushed $count commits to $Remote/$Branch"
    } catch {
        Write-Log ("push attempt {0} failed: {1}" -f $attempt, $_.Exception.Message)
        if ($attempt -lt 5) { Start-Sleep -Seconds (10 * $attempt) }
    }
}

if (-not $pushed) {
    Write-Log "ERROR: could not push after 5 attempts. Commits remain local."
    exit 1
}

Set-Content -Path $Marker -Value $today -Encoding UTF8
Write-Log "=== daily auto-commit done ($count commits) ==="
exit 0
