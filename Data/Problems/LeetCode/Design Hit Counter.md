# 362. Design Hit Counter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-hit-counter](https://leetcode.com/problems/design-hit-counter)
**Companies:** Affirm, Amazon, Apple, Atlassian, Bloomberg, Careem, Cloudflare, Coupang, Databricks, Dropbox, Google, Meta, Microsoft, Openai, Oracle, Oscar Health, Reddit, Roblox, Sentry, Snapchat, Snowflake, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Design a hit counter which counts the number of hits received in the past `5` minutes (i.e., the past `300` seconds).

Your system should accept a `timestamp` parameter (**in seconds** granularity), and you may assume that calls are being made to the system in chronological order (i.e., `timestamp` is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the `HitCounter` class:

- `HitCounter()` Initializes the object of the hit counter system.
- `void hit(int timestamp)` Records a hit that happened at `timestamp` (**in seconds**). Several hits may happen at the same `timestamp`.
- `int getHits(int timestamp)` Returns the number of hits in the past 5 minutes from `timestamp` (i.e., the past `300` seconds).

**Constraints:**
- `1 <= timestamp <= 2 * 10^9`
- All the calls are being made to the system in chronological order (i.e., `timestamp` is monotonically increasing).
- At most `300` calls will be made to `hit` and `getHits`.

**Follow up:** What if the number of hits per second could be huge? Does your design scale?

---

## Examples

```
Example 1:
  Input:
  ["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
  [[], [1], [2], [3], [4], [300], [300], [301]]
  Output:
  [null, null, null, null, 3, null, 4, 3]
  Explanation:
  HitCounter hitCounter = new HitCounter();
  hitCounter.hit(1);       // hit at timestamp 1.
  hitCounter.hit(2);       // hit at timestamp 2.
  hitCounter.hit(3);       // hit at timestamp 3.
  hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
  hitCounter.hit(300);     // hit at timestamp 300.
  hitCounter.getHits(300); // get hits at timestamp 300, return 4.
  hitCounter.getHits(301); // get hits at timestamp 301, return 3.
```

---

## Walkthrough

| Step | Operation | Internal State (times, hits) |
|------|-----------|------------------------------|
| 1 | `hit(1)` | `times[1] = 1`, `hits[1] = 1`
| 2 | `hit(2)` | `times[2] = 2`, `hits[2] = 1`
| 3 | `hit(300)` | `times[0] = 300`, `hits[0] = 1` (index 0 = 300 % 300)
| 4 | `getHits(300)` | Iterate 0-299, sum hits where `300 - times[i] < 300` → total = 3 |
| 5 | `getHits(301)` | `times[1] = 1` is now older than 300 seconds, excluded → total = 2 |

The walkthrough shows how the circular array overwrites old timestamps and how the sum is computed.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time (hit)** | O(1) |
| **Time (getHits)** | O(300) = O(1) |
| **Space** | O(300) = O(1) |

---

## Key Takeaway

> Circular array with modulo indexing provides O(1) operations with fixed space. The timestamp check handles overwrites.
