$leads = @(
  @{slug='wordpressseoagency'; name='WordPress SEO Agency'; email='info@wordpressseoagency.com'; site='https://www.wordpressseoagency.com/'; sitemap='https://www.wordpressseoagency.com/wp-sitemap.xml'; source='https://www.wordpressseoagency.com/contact/'},
  @{slug='vertigo-studio'; name='Vertigo Studio'; email='info@vertigostudio.co'; site='https://vertigostudio.co/'; sitemap='https://vertigostudio.co/wp-sitemap.xml'; source='https://vertigostudio.co/contact/'},
  @{slug='tmc-digital-works'; name='TMC Digital Works'; email='hello@tmcdigitalworks.com'; site='https://tmcdigitalworks.com/'; sitemap='https://tmcdigitalworks.com/wp-sitemap.xml'; source='https://tmcdigitalworks.com/'},
  @{slug='wpbigbang'; name='WP BigBang'; email='hello@wpbigbang.com'; site='https://wpbigbang.com/'; sitemap='https://wpbigbang.com/sitemap_index.xml'; source='https://wpbigbang.com/about-wpbigbang/'},
  @{slug='octave-agency'; name='Octave Agency'; email='hello@octaveagency.com'; site='https://www.octaveagency.com/'; sitemap='https://www.octaveagency.com/wp-sitemap.xml'; source='https://www.octaveagency.com/wordpress-seo-agency/'},
  @{slug='checksite'; name='CheckSite Websites & SEO'; email='info@checksite.ca'; site='https://checksite.ca/'; sitemap='https://checksite.ca/wp-sitemap.xml'; source='https://checksite.ca/'},
  @{slug='wiserank'; name='WiseRank'; email='info@wiserank.co.uk'; site='https://wiserank.co.uk/'; sitemap='https://wiserank.co.uk/wp-sitemap.xml'; source='https://wiserank.co.uk/'},
  @{slug='wpmaintenance-uk'; name='WP Maintenance UK'; email='info@wpmaintenance.uk'; site='https://wpmaintenance.uk/'; sitemap='https://wpmaintenance.uk/wp-sitemap.xml'; source='https://wpmaintenance.uk/'},
  @{slug='wpspeedfix'; name='WP Speed Fix'; email='questions@wpspeedfix.com'; site='https://www.wpspeedfix.com/'; sitemap='https://www.wpspeedfix.com/wp-sitemap.xml'; source='https://www.wpspeedfix.com/'},
  @{slug='ai-engine-optim'; name='AI Engine Optim'; email='contact@aiengineoptim.ro'; site='https://aiengineoptim.ro/'; sitemap='https://aiengineoptim.ro/wp-sitemap.xml'; source='https://aiengineoptim.ro/contact/'}
)
$outRoot = 'outputs/prospect-audits-2026-05-18'
New-Item -ItemType Directory -Force -Path $outRoot | Out-Null
$results = @()
foreach ($lead in $leads) {
  $dir = Join-Path $outRoot $lead.slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $stdout = Join-Path $dir 'audit-stdout.txt'
  $stderr = Join-Path $dir 'audit-stderr.txt'
  $args = @('-m','internal_link_agent.cli','audit','--sitemap',$lead.sitemap,'--site-url',$lead.site.TrimEnd('/'),'--out-dir',$dir,'--limit','12','--delay','0')
  Write-Output "RUN $($lead.slug)"
  $p = Start-Process -FilePath (Resolve-Path .\.venv\Scripts\python.exe) -ArgumentList $args -WorkingDirectory (Get-Location) -PassThru -NoNewWindow -RedirectStandardOutput $stdout -RedirectStandardError $stderr
  $finished = $p.WaitForExit(90000)
  if (-not $finished) {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
    $status = 'timeout'
  } elseif ($p.ExitCode -eq 0) {
    $status = 'ok'
  } else {
    $status = "error_$($p.ExitCode)"
  }
  $summary = if (Test-Path $stdout) { (Get-Content $stdout -Raw).Trim() } else { '' }
  $err = if (Test-Path $stderr) { (Get-Content $stderr -Raw).Trim() } else { '' }
  Write-Output "DONE $($lead.slug) $status $summary"
  $results += [pscustomobject]@{slug=$lead.slug; name=$lead.name; email=$lead.email; site=$lead.site; sitemap=$lead.sitemap; source=$lead.source; status=$status; summary=$summary; error=$err; report=(Join-Path $dir 'report.md'); suggestions=(Join-Path $dir 'suggestions.csv')}
}
$results | ConvertTo-Json -Depth 5 | Set-Content -Path (Join-Path $outRoot 'lead-audit-results.json') -Encoding UTF8
$results | Export-Csv -NoTypeInformation -Encoding UTF8 -Path (Join-Path $outRoot 'lead-audit-results.csv')
