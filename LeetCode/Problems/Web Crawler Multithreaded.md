# 1242. Web Crawler Multithreaded

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler-multithreaded](https://leetcode.com/problems/web-crawler-multithreaded)
**Companies:** Anthropic, Apple, Dropbox, Google, Meta, Mongodb, Openai, Rubrik, Snowflake

---

## Approach: BFS with Thread Pool ✅

```
CLASS Solution:
    FUNCTION crawl(startUrl, htmlParser):
        hostname = getHostname(startUrl)
        visited = ConcurrentSet()
        visited.ADD(startUrl)
        queue = ConcurrentQueue([startUrl])

        FUNCTION worker():
            WHILE NOT done:
                url = queue.DEQUEUE()
                IF url == null: CONTINUE
                FOR nextUrl IN htmlParser.getUrls(url):
                    IF getHostname(nextUrl) == hostname AND nextUrl NOT IN visited:
                        visited.ADD(nextUrl)
                        queue.ENQUEUE(nextUrl)

        threads = [Thread(worker) for _ in range(NUM_THREADS)]
        START all threads
        WAIT for all threads

        RETURN list(visited)

FUNCTION getHostname(url):
    RETURN url.SPLIT('/')[2]
```

Key: thread-safe visited set and queue. Only crawl same-hostname URLs.
