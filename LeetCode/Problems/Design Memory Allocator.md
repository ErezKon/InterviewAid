# 2502. Design Memory Allocator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-memory-allocator](https://leetcode.com/problems/design-memory-allocator)
**Companies:** Amazon, Apple, Bytedance, Capital One, Meta, Microsoft, Nvidia, Openai, Qualcomm, Roblox, Rubrik, Sig, Tesla, Tiktok, Two Sigma, Uber, Visa

---

## Problem Description

Design a memory allocator over `n` units: `allocate(size, mID)` finds the leftmost block of `size` free units, `freeMemory(mID)` frees all units with that ID.

---

## Approach: Array Simulation — O(n) per operation ✅

```text
CLASS Allocator:
    CONSTRUCTOR(n):
        memory ← [0] * n

    FUNCTION allocate(size, mID):
        consecutive ← 0
        FOR i ← 0 TO n - 1:
            IF memory[i] = 0:
                consecutive ← consecutive + 1
                IF consecutive = size:
                    FOR j ← i - size + 1 TO i:
                        memory[j] ← mID
                    RETURN i - size + 1
            ELSE:
                consecutive ← 0
        RETURN -1

    FUNCTION freeMemory(mID):
        count ← 0
        FOR i ← 0 TO n - 1:
            IF memory[i] = mID:
                memory[i] ← 0
                count ← count + 1
        RETURN count
```

---

## Examples

| Operation | Result |
|-----------|--------|
| `Allocator(10)` | — |
| `allocate(3, 1)` | Returns **0** (allocates units 0‑2) |
| `allocate(4, 2)` | Returns **3** (allocates units 3‑6) |
| `freeMemory(1)` | Returns **3** (frees units 0‑2) |
| `allocate(5, 3)` | Returns **-1** (no contiguous block of 5) |

---

## Walkthrough

1. **Initialize** with 10 free units (`memory = [0,0,0,0,0,0,0,0,0,0]`).
2. `allocate(3,1)` scans from left, finds three consecutive zeros at indices 0‑2, sets them to `1`. Memory becomes `[1,1,1,0,0,0,0,0,0,0]`.
3. `allocate(4,2)` continues scanning, finds four zeros at 3‑6, sets them to `2`. Memory becomes `[1,1,1,2,2,2,2,0,0,0]`.
4. `freeMemory(1)` iterates, resets indices 0‑2 to `0`, counting three freed units.
5. `allocate(5,3)` now sees only a block of three zeros (0‑2) and a block of three zeros (7‑9); no block of size 5, so returns `-1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) per `allocate` and `freeMemory` due to linear scan |
| **Space** | O(n) to store the memory array |

---

## Follow-Up Questions

- How could you improve allocation to O(log n) using a segment tree or balanced interval tree?
- How would you support merging adjacent free blocks efficiently?
- Can you design a thread‑safe allocator for concurrent allocations?

---

## Key Takeaway

> **Array simulation with a consecutive‑free counter finds the leftmost fit. For better performance, maintain a free‑list of intervals or use a balanced tree of gaps.**
