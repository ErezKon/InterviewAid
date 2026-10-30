# 1236. Web Crawler

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/web-crawler](https://leetcode.com/problems/web-crawler)
**Companies:** Amazon, Anthropic, Dropbox, Meta, Microsoft, Rubrik, Snowflake

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a url `startUrl` and an interface `HtmlParser`, implement a web crawler to crawl all links that are under the **same hostname** as `startUrl`.

Return all urls obtained by your web crawler in **any** order.

Your crawler should:

- Start from the page: `startUrl`
- Call `HtmlParser.getUrls(url)` to get all urls from a webpage of given url.
- Do not crawl the same link twice.
- Explore only the links that are under the **same hostname** as `startUrl`.

![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1236.Web%20Crawler/images/urlhostname.png)

As shown in the example url above, the hostname is `example.org`. For simplicity sake, you may assume all urls use **http protocol** without any **port** specified. For example, the urls `http://leetcode.com/problems` and `http://leetcode.com/contest` are under the same hostname, while urls `http://example.org/test` and `http://example.com/abc` are not under the same hostname.

The `HtmlParser` interface is defined as such:

```
interface HtmlParser {
  // Return a list of all urls from a webpage of given *url*.
  public List<String> getUrls(String url);
}
```

Below are two examples explaining the functionality of the problem, for custom testing purposes you'll have three variables urls`, edges` and startUrl`. Notice that you will only have access to startUrl` in your code, while urls` and edges` are not directly accessible to you in code.

Note: Consider the same URL with the trailing slash "/" as a different URL. For example, "http://news.yahoo.com", and "http://news.yahoo.com/" are different urls.

**Constraints:**
- `1 <= urls.length <= 1000`
- `1 <= urls[i].length <= 300`
- `startUrl` is one of the `urls`.
- Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from 'a' to 'z', digits  from '0' to '9' and the hyphen-minus character ('-').
- The hostname may not start or end with the hyphen-minus character ('-').
- See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
- You may assume there're no duplicates in url library.

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
![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1236.Web%20Crawler/images/sample_3_1497.png)
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
