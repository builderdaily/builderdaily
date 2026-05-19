$ErrorActionPreference = 'Continue'
$candidates = @(
  @{name='WordPress SEO Agency'; site='https://www.wordpressseoagency.com/'; source='https://www.wordpressseoagency.com/contact/'; email='info@wordpressseoagency.com'},
  @{name='Vertigo Studio'; site='https://vertigostudio.co/'; source='https://vertigostudio.co/wordpress-seo-agency/'; email='info@vertigostudio.co'},
  @{name='TMC Digital Works'; site='https://tmcdigitalworks.com/'; source='https://tmcdigitalworks.com/'; email='hello@tmcdigitalworks.com'},
  @{name='Neometa'; site='https://www.neometa.uk/'; source='https://www.neometa.uk/'; email='info@neometa.uk'},
  @{name='Semseo Agency'; site='https://www.semseoagency.com/en/'; source='https://www.semseoagency.com/en/seo-wordpress'; email='info@semseoagency.com'},
  @{name='WP BigBang'; site='https://wpbigbang.com/'; source='https://wpbigbang.com/wordpress-seo-services/'; email='hello@wpbigbang.com'},
  @{name='Octave Agency'; site='https://www.octaveagency.com/'; source='https://www.octaveagency.com/wordpress-seo-agency/'; email='hello@octaveagency.com'},
  @{name='Dave Ashworth'; site='https://daveashworth.co/'; source='https://daveashworth.co/skills/wordpress-seo/'; email='hello@daveashworth.co'},
  @{name='SiteMile'; site='https://sitemile.com/'; source='https://sitemile.com/'; email=''},
  @{name='SiteWired'; site='https://www.sitewired.com/'; source='https://www.sitewired.com/'; email=''},
  @{name='GoMage'; site='https://www.gomage.com/'; source='https://www.gomage.com/wordpress-seo-agency/'; email=''},
  @{name='Pronto Marketing'; site='https://www.prontomarketing.com/'; source='https://www.prontomarketing.com/'; email=''},
  @{name='Figment Agency'; site='https://www.figmentagency.com/'; source='https://www.figmentagency.com/wordpress-seo-agency/'; email=''},
  @{name='OneLittleWeb'; site='https://onelittleweb.com/'; source='https://onelittleweb.com/wordpress-seo/'; email=''},
  @{name='A1 SEO'; site='https://a1seo.com/'; source='https://a1seo.com/wordpress-seo-agency/'; email=''}
)
function Get-Text($url) {
  $out = & curl.exe -L --max-time 10 --connect-timeout 5 -A 'Mozilla/5.0 internal-link-agent-lead-research/0.1' -s $url 2>$null
  if ($LASTEXITCODE -eq 0) { return ($out -join "`n") }
  return ''
}
function Find-Sitemap($site, $html) {
  $paths = @('/sitemap_index.xml','/wp-sitemap.xml','/sitemap.xml','/page-sitemap.xml','/post-sitemap.xml')
  $robots = Get-Text (($site.TrimEnd('/')) + '/robots.txt')
  foreach ($line in ($robots -split "`n")) {
    if ($line -match '^[Ss]itemap:\s*(https?://\S+)') {
      $sm = $Matches[1].Trim()
      $txt = Get-Text $sm
      if ($txt -match '<urlset|<sitemapindex') { return $sm }
    }
  }
  foreach ($p in $paths) {
    $sm = ($site.TrimEnd('/')) + $p
    $txt = Get-Text $sm
    if ($txt -match '<urlset|<sitemapindex') { return $sm }
  }
  return ''
}
function Find-Emails($text, $known) {
  $emails = New-Object System.Collections.Generic.List[string]
  if ($known) { $emails.Add($known.ToLower()) }
  foreach ($m in [regex]::Matches($text, '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}', 'IgnoreCase')) {
    $e = $m.Value.Trim(' ','.',',',';',':','(',')','[',']','<','>').ToLower()
    if ($e -match 'example\.com|domain\.com|yourdomain|email\.com|sentry\.io|wixpress\.com') { continue }
    if (-not $emails.Contains($e)) { $emails.Add($e) }
  }
  return @($emails)
}
$results = @()
foreach ($c in $candidates) {
  $home = Get-Text $c.site
  $source = if ($c.source -ne $c.site) { Get-Text $c.source } else { '' }
  $contact = Get-Text (($c.site.TrimEnd('/')) + '/contact/')
  $all = "$home`n$source`n$contact"
  $signals = @()
  if ($all -match 'wp-content') { $signals += 'wp-content' }
  if ($all -match 'wp-includes') { $signals += 'wp-includes' }
  $wpjson = Get-Text (($c.site.TrimEnd('/')) + '/wp-json/')
  if ($wpjson -match '"name"|"routes"') { $signals += 'wp-json' }
  $emails = Find-Emails $all $c.email
  $sm = Find-Sitemap $c.site $all
  $item = [ordered]@{ name=$c.name; site=$c.site; source=$c.source; emails=$emails; wp_signals=@($signals | Select-Object -Unique); sitemap=$sm }
  $results += [pscustomobject]$item
  Write-Output (($item | ConvertTo-Json -Compress))
}
$out = 'outputs/prospect-audits-2026-05-18'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$results | ConvertTo-Json -Depth 5 | Set-Content -Path "$out/candidate-discovery.json" -Encoding UTF8
