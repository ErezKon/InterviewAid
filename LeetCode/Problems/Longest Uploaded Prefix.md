# 2424. Longest Uploaded Prefix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uploaded-prefix](https://leetcode.com/problems/longest-uploaded-prefix)
**Companies:** Google

---

## 1. Problem Description

Design a system where videos are uploaded (not necessarily in order). At any point, return the longest prefix of consecutively uploaded videos.

---

## 2. Approach: Set + Pointer — O(1) amortized ✅

```
CLASS LUPrefix:
    INIT(n):
        uploaded = set()
        prefix = 0

    FUNCTION upload(video):
        uploaded.ADD(video)
        WHILE prefix + 1 IN uploaded:
            prefix += 1

    FUNCTION longest():
        RETURN prefix
```

| Time | Space |
|------|-------|
| O(1) amortized per operation | O(n) |

---

## 3. Key Takeaway

> Maintain a prefix pointer. On each upload, advance the pointer through all consecutive uploaded videos. Each video advances the pointer at most once → amortized O(1).
