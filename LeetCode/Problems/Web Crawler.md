# 1236. Web Crawler

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler](https://leetcode.com/problems/web-crawler)
**Companies:** Amazon, Anthropic, Dropbox, Meta, Microsoft, Rubrik, Snowflake

---

```
FUNCTION crawl(startUrl, htmlParser):
    hostname = startUrl.SPLIT('/')[2]
    visited = {startUrl}
    queue = [startUrl]

    WHILE queue:
        url = queue.DEQUEUE()
        FOR nextUrl IN htmlParser.getUrls(url):
            IF nextUrl.SPLIT('/')[2] == hostname AND nextUrl NOT IN visited:
                visited.ADD(nextUrl)
                queue.ENQUEUE(nextUrl)

    RETURN list(visited)
```

Standard BFS. Only follow same-hostname URLs.
