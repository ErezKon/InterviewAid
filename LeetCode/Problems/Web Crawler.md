# 1236. Web Crawler

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler](https://leetcode.com/problems/web-crawler)
**Companies:** Amazon, Anthropic, Dropbox, Meta, Microsoft, Rubrik, Snowflake
---

## Problem Description
Given a starting URL `startUrl` and an `HtmlParser` interface that returns all URLs reachable from a page, crawl all pages that share the same hostname as `startUrl`. Return the list of all visited URLs.

## Examples
- Input: `startUrl = "http://example.com"` with parser returning same‑host links.
  Output: All URLs on `example.com` reachable via BFS.
- Input: `startUrl = "http://site.org"` with no other same‑host URLs.
  Output: `["http://site.org"]`.

## Approach
Perform a breadth‑first search (BFS) using a queue. Maintain a visited set to avoid revisiting URLs. Only enqueue URLs whose hostname matches that of `startUrl`.

```text
FUNCTION crawl(startUrl, htmlParser):
    SET hostname ← getHostname(startUrl)
    SET visited ← SET containing startUrl
    SET queue ← QUEUE containing startUrl
    WHILE queue NOT EMPTY:
        SET url ← queue.DEQUEUE()
        FOR nextUrl IN htmlParser.getUrls(url):
            IF getHostname(nextUrl) = hostname AND nextUrl NOT IN visited:
                visited.ADD(nextUrl)
                queue.ENQUEUE(nextUrl)
    RETURN LIST(visited)

FUNCTION getHostname(url):
    RETURN SUBSTRING between "//" and next "/" in url
```

## Walkthrough
| Step | Dequeue | New URLs discovered | Queue after step | Visited |
|------|---------|--------------------|------------------|---------|
| 1    | startUrl | A, B               | [A,B]            | {startUrl} |
| 2    | A        | C                  | [B,C]            | {startUrl,A} |
| …    | …        | …                  | …                | … |

## Complexity Analysis
- Time: O(V + E) where V is number of visited pages and E total links examined.
- Space: O(V) for visited set and queue.

## Follow‑Up Questions
- How would you limit crawling depth?
- What if you needed to respect robots.txt rules?
- Can you parallelize the BFS while preserving correctness?

## Key Takeaway
A simple BFS with a visited set efficiently discovers all same‑host pages reachable from the start URL.
