$old = [Environment]::GetEnvironmentVariable('Path', 'User')
$new = "$old;C:\Program Files\Git\cmd"
[Environment]::SetEnvironmentVariable('Path', $new, 'User')
Write-Output "PATH updated"