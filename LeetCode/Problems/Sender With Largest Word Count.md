# 2284. Sender With Largest Word Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sender-with-largest-word-count](https://leetcode.com/problems/sender-with-largest-word-count)
**Companies:** Google

---

## Problem Description

Given `messages` and `senders` arrays, find the sender with the most total words. Ties broken by lexicographically largest name.

---

## Approach

```
FUNCTION largestWordCount(messages, senders):
    count = defaultdict(int)
    FOR i ← 0 TO n - 1:
        count[senders[i]] += len(messages[i].split())
    RETURN MAX(count.keys(), key=lambda s: (count[s], s))
```

| Time | Space |
|------|-------|
| O(n·w) | O(n) — sender counts |
