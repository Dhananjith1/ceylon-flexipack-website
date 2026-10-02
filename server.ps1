$root = (Get-Location).Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:5500/')
$listener.Start()
Write-Host "Ceylon Flexipack running at http://localhost:5500/"

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'
  '.js' = 'application/javascript; charset=utf-8'
  '.jpeg' = 'image/jpeg'
  '.jpg' = 'image/jpeg'
  '.png' = 'image/png'
  '.webp' = 'image/webp'
  '.svg' = 'image/svg+xml'
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $relativePath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
  if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
  $filePath = Join-Path $root ($relativePath -replace '/', '\')
  $resolvedRoot = [IO.Path]::GetFullPath($root)
  $resolvedFile = [IO.Path]::GetFullPath($filePath)

  if ($resolvedFile.StartsWith($resolvedRoot) -and (Test-Path $resolvedFile -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($resolvedFile)
    $extension = [IO.Path]::GetExtension($resolvedFile).ToLowerInvariant()
    if ($mimeTypes.ContainsKey($extension)) { $context.Response.ContentType = $mimeTypes[$extension] }
    $context.Response.StatusCode = 200
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
    $message = [Text.Encoding]::UTF8.GetBytes('Not found')
    $context.Response.OutputStream.Write($message, 0, $message.Length)
  }
  $context.Response.Close()
}
