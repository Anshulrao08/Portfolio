$old = [Environment]::GetEnvironmentVariable('Path','User')
$new = "$old;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"
[Environment]::SetEnvironmentVariable('Path',$new,'User')
Write-Output "PATH updated: $new"
