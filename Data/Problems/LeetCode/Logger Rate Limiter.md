# 359. Logger Rate Limiter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/logger-rate-limiter](https://leetcode.com/problems/logger-rate-limiter)
**Companies:** Amazon, Appfolio, Apple, Atlassian, Bloomberg, Cloudflare, Deliveroo, Docusign, Google, Grammarly, Intuit, Meta, Microsoft, Netflix, Oracle, Palo Alto Networks, Patreon, Reddit, Roblox, Verily, Waymo

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Design a logger system that receives a stream of messages along with their timestamps. Each **unique** message should only be printed **at most every 10 seconds** (i.e. a message printed at timestamp `t` will prevent other identical messages from being printed until timestamp `t + 10`).

All messages will come in chronological order. Several messages may arrive at the same timestamp.

Implement the `Logger` class:

- `Logger()` Initializes the `logger` object.
- `bool shouldPrintMessage(int timestamp, string message)` Returns `true` if the `message` should be printed in the given `timestamp`, otherwise returns `false`.

**Constraints:**
- `0 <= timestamp <= 10^9`
- Every `timestamp` will be passed in non-decreasing order (chronological order).
- `1 <= message.length <= 30`
- At most `10^4` calls will be made to `shouldPrintMessage`.

---

## 2. Examples

**Example 1:**
```
Input
["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
[[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
Output:
[null, true, true, false, false, false, true]
Explanation:
Logger logger = new Logger();
logger.shouldPrintMessage(1, "foo");  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
logger.shouldPrintMessage(2, "bar");  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
logger.shouldPrintMessage(3, "foo");  // 3 < 11, return false
logger.shouldPrintMessage(8, "bar");  // 8 < 12, return false
logger.shouldPrintMessage(10, "foo"); // 10 < 11, return false
logger.shouldPrintMessage(11, "foo"); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 + 10 = 21
```

---

## 3. Approach: Hash Map — O(1) ✅

```text
CLASS Logger:
    CONSTRUCTOR:
        lastPrinted ← {}    // message → timestamp

    FUNCTION shouldPrintMessage(timestamp, message):
        IF message NOT IN lastPrinted OR timestamp - lastPrinted[message] >= 10:
            lastPrinted[message] ← timestamp
            RETURN true
        RETURN false
```

---

## 4. Walkthrough

1. Initialize an empty hash map `lastPrinted`.
2. For each incoming `(timestamp, message)` call:
   - If `message` is not in the map or the difference between `timestamp` and the stored timestamp is at least 10, update the map with the current timestamp and return `true` (print).
   - Otherwise, return `false` (suppress).
3. The map always holds the most recent printed timestamp for each distinct message.

---

## 5. Complexity Analysis

- **Time:** O(1) per `shouldPrintMessage` call – constant-time hash-map look-up and update.
- **Space:** O(M) where M is the number of distinct messages that have been printed within the last 10 seconds (worst-case all unique messages).

---

## 6. Follow-Up Questions

- How would you adapt the solution to limit memory usage, e.g., by discarding entries older than 10 seconds?
- Can you implement the logger using a sliding-window queue instead of a hash map?
- How would you handle messages arriving out of order?

---

## 7. Key Takeaway

> Simple hash map stores last-printed timestamp per message. For memory-constrained environments, use a circular buffer or LRU cache to limit stored messages.
