# 1313. Decompress Run-Length Encoded List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decompress-run-length-encoded-list](https://leetcode.com/problems/decompress-run-length-encoded-list)
**Companies:** Google

---

## Problem Description

Given pairs `[freq, val]` in a flat array, produce the decompressed list where each `val` appears `freq` times.

---

## Approach

```
FUNCTION decompressRLElist(nums):
    result = []
    FOR i ← 0 TO len(nums)-1 STEP 2:
        result.EXTEND([nums[i+1]] * nums[i])
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(output length) |
| **Space** | O(output length) |

---

## Key Takeaway

> **RLE decompression: iterate pairs, append `val` repeated `freq` times. Simple simulation.**
