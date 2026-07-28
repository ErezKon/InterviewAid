# 1242. Web Crawler Multithreaded

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler-multithreaded](https://leetcode.com/problems/web-crawler-multithreaded)
**Companies:** Anthropic, Apple, Dropbox, Google, Meta, Mongodb, Openai, Rubrik, Snowflake
---

## Problem Description
Given a starting URL `startUrl` and an `HtmlParser` interface that returns all URLs reachable from a page, crawl all pages that share the same hostname as `startUrl`. The crawler must be multithreaded, using a fixed number of worker threads, and must avoid visiting any URL more than once.

## Examples
- Input: `startUrl = "http://example.com"`, parser returns URLs on the same host.
  Output: List of all URLs reachable on `example.com`.
- Input: `startUrl = "http://site.org"` with no other same‑host URLs.
  Output: `["http://site.org"]`.

## Approach
Use a thread‑safe queue for URLs to visit and a concurrent set for visited URLs. Spawn a pool of worker threads; each repeatedly dequeues a URL, fetches its outgoing links via `htmlParser.getUrls`, and enqueues any unvisited same‑host URLs.

```text
FUNCTION crawl(startUrl, htmlParser):
    SET hostname ← getHostname(startUrl)
    SET visited ← CONCURRENT SET containing startUrl
    SET queue ← CONCURRENT QUEUE containing startUrl

    FUNCTION worker():
        WHILE TRUE:
            SET url ← queue.DEQUEUE()
            IF url = null: BREAK
            FOR nextUrl IN htmlParser.getUrls(url):
                IF getHostname(nextUrl) = hostname AND nextUrl NOT IN visited:
                    visited.ADD(nextUrl)
                    queue.ENQUEUE(nextUrl)

    CREATE NUM_THREADS workers executing worker()
    WAIT for all workers to finish
    RETURN LIST(visited)

FUNCTION getHostname(url):
    RETURN SUBSTRING between "//" and next "/" in url
```

## Walkthrough
| Step | Action | Queue | Visited |
|------|--------|-------|---------|
| Init | enqueue startUrl | [startUrl] | {startUrl} |
| Worker 1 | dequeue startUrl, fetch links A,B | [A,B] | {startUrl} |
| Worker 2 | dequeue A, add C | [B,C] | {startUrl,A} |
| … | continue until queue empty |

## Complexity Analysis
- Time: O(V + E) where V is number of visited pages and E total links examined.
- Space: O(V) for visited set and queue.
- Parallelism reduces wall‑clock time proportionally to the number of threads (up to I/O limits).

## Follow‑Up Questions
- How would you limit the depth of crawling?
- What changes are needed to handle rate‑limiting per domain?
- Can you design a lock‑free version of the visited set?

## Key Takeaway
A concurrent queue and visited set enable safe, parallel breadth‑first crawling while guaranteeing each URL is processed once.
