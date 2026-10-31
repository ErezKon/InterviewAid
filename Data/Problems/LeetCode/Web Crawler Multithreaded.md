# 1242. Web Crawler Multithreaded

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler-multithreaded](https://leetcode.com/problems/web-crawler-multithreaded)
**Companies:** Anthropic, Apple, Dropbox, Google, Meta, Mongodb, Openai, Rubrik, Snowflake

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. Same crawling rules as #1236 Web Crawler, but single-threaded solutions exceed the time limit.*

Given a URL `startUrl` and an interface `HtmlParser`, implement **a Multi-threaded web crawler** to crawl all links that are under the **same hostname** as `startUrl`.

Return all URLs obtained by your web crawler in **any** order.

Your crawler should:

- Start from the page: `startUrl`
- Call `HtmlParser.getUrls(url)` to get all URLs from a webpage of a given URL.
- Do not crawl the same link twice.
- Explore only the links that are under the **same hostname** as `startUrl`.

![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1242.Web%20Crawler%20Multithreaded/images/urlhostname.png)
As shown in the example URL above, the hostname is `example.org`. For simplicity's sake, you may assume all URLs use **HTTP protocol** without any **port** specified. For example, the URLs `http://leetcode.com/problems` and `http://leetcode.com/contest` are under the same hostname, while URLs `http://example.org/test` and `http://example.com/abc` are not under the same hostname.

The `HtmlParser` interface is defined as such:

```
interface HtmlParser {
  // Return a list of all urls from a webpage of given *url*.
  // This is a blocking call, that means it will do HTTP request and return when this request is finished.
  public List<String> getUrls(String url);
}
```

Note that `getUrls(String url)` simulates performing an HTTP request. You can treat it as a blocking function call that waits for an HTTP request to finish. It is guaranteed that `getUrls(String url)` will return the URLs within **15ms. ** Single-threaded solutions will exceed the time limit so, can your multi-threaded web crawler do better?

Below are two examples explaining the functionality of the problem. For custom testing purposes, you'll have three variables `urls`, `edges` and `startUrl`. Notice that you will only have access to `startUrl` in your code, while `urls` and `edges` are not directly accessible to you in code.

**Follow up:**

- Assume we have 10,000 nodes and 1 billion URLs to crawl. We will deploy the same software onto each node. The software can know about all the nodes. We have to minimize communication between machines and make sure each node does equal amount of work. How would your web crawler design change?
- What if one node fails or does not work?
- How do you know when the crawler is done?

**Constraints:**
- `1 <= urls.length <= 1000`
- `1 <= urls[i].length <= 300`
- `startUrl` is one of the `urls`.
- Hostname label must be from `1` to `63` characters long, including the dots, may contain only the ASCII letters from `'a'` to `'z'`, digits from `'0'` to `'9'` and the hyphen-minus character (`'-'`).
- The hostname may not start or end with the hyphen-minus character ('-').
- See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
- You may assume there're no duplicates in the URL library.

## Examples

**Example 1:**
```
Input: urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]
```

**Example 2:**
```
![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1242.Web%20Crawler%20Multithreaded/images/sample_3_1497.png)
Input: urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
Explanation: The startUrl links to all other pages that do not share the same hostname.
```

## Approach
Use a thread-safe queue for URLs to visit and a concurrent set for visited URLs. Spawn a pool of worker threads; each repeatedly dequeues a URL, fetches its outgoing links via `htmlParser.getUrls`, and enqueues any unvisited same-host URLs.

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
- Time: O(V + E) where V is number of visited pages and E total links examined.
- Space: O(V) for visited set and queue.
- Parallelism reduces wall-clock time proportionally to the number of threads (up to I/O limits).

## Follow-Up Questions
- How would you limit the depth of crawling?
- What changes are needed to handle rate-limiting per domain?
- Can you design a lock-free version of the visited set?

## Key Takeaway
A concurrent queue and visited set enable safe, parallel breadth-first crawling while guaranteeing each URL is processed once.
