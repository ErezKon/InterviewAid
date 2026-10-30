"""Shared paths for the enrichment scripts.

D      - directory with the problem .md files (parent of this scripts/ folder)
CACHE  - cache of fetched official problem texts (override with LC_CACHE)
BAK    - backup dir used before bulk edits (override with LC_BAK)
FETCH  - path of lc_fetch.py
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.dirname(HERE)
CACHE = os.environ.get("LC_CACHE", "/tmp/lc")
BAK = os.environ.get("LC_BAK", "/tmp/bak")
FETCH = os.path.join(HERE, "lc_fetch.py")
os.makedirs(CACHE, exist_ok=True)
