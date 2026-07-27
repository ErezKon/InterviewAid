# 768. Max Chunks To Make Sorted II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-chunks-to-make-sorted-ii](https://leetcode.com/problems/max-chunks-to-make-sorted-ii)
**Companies:** Amazon, Bloomberg, Google, Salesforce

---

## 1. Problem Description

Split an array (with duplicates) into maximum chunks such that sorting each chunk independently gives the fully sorted array.

---

## 2. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maxChunksToSorted(arr):
    // Stack of max values per chunk
    stack = []
    FOR num IN arr:
        IF stack AND num < stack[-1]:
            maxVal = stack[-1]
            WHILE stack AND num < stack[-1]: stack.POP()
            stack.PUSH(maxVal)
        ELSE:
            stack.PUSH(num)
    RETURN len(stack)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Stack tracks the max of each chunk. When a new element is smaller than previous chunk's max, merge chunks (pop) but preserve the overall max. Stack size = number of chunks.
