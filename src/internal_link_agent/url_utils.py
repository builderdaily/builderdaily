from __future__ import annotations

from html import unescape
from urllib.parse import urldefrag, urljoin, urlparse, urlunparse


def normalize_url(raw_url: str, base_url: str | None = None) -> str:
    value = unescape((raw_url or "").strip())
    if base_url:
        value = urljoin(base_url, value)
    value, _fragment = urldefrag(value)
    parsed = urlparse(value)
    if not parsed.scheme or not parsed.netloc:
        return value
    path = parsed.path or "/"
    return urlunparse((parsed.scheme.lower(), parsed.netloc.lower(), path, "", "", ""))


def same_site(url: str, site_url: str) -> bool:
    parsed_url = urlparse(normalize_url(url))
    parsed_site = urlparse(normalize_url(site_url))
    return bool(parsed_url.netloc) and parsed_url.netloc == parsed_site.netloc
