# 2502. Design Memory Allocator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-memory-allocator](https://leetcode.com/problems/design-memory-allocator)
**Companies:** Amazon, Apple, Bytedance, Capital One, Meta, Microsoft, Nvidia, Openai, Qualcomm, Roblox, Rubrik, Sig, Tesla, Tiktok, Two Sigma, Uber, Visa

---

## Problem Description

Design a memory allocator over `n` units: `allocate(size, mID)` finds the leftmost block of `size` free units, `freeMemory(mID)` frees all units with that ID.

---

## Approach: Array Simulation — O(n) per operation ✅

```
CLASS Allocator:
    CONSTRUCTOR(n):
        memory = [0] * n

    FUNCTION allocate(size, mID):
        consecutive = 0
        FOR i ← 0 TO n - 1:
            IF memory[i] == 0:
                consecutive += 1
                IF consecutive == size:
                    FOR j ← i - size + 1 TO i:
                        memory[j] = mID
                    RETURN i - size + 1
            ELSE:
                consecutive = 0
        RETURN -1

    FUNCTION freeMemory(mID):
        count = 0
        FOR i ← 0 TO n - 1:
            IF memory[i] == mID:
                memory[i] = 0
                count += 1
        RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) per allocate/free |
| **Space** | O(n) |

---

## Key Takeaway

> **Array simulation with a consecutive-free counter finds the leftmost fit. For better performance, maintain a free-list of intervals or use a balanced tree of gaps.**
