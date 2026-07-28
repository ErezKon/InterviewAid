# 1860. Incremental Memory Leak

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/incremental-memory-leak](https://leetcode.com/problems/incremental-memory-leak)
**Companies:** Tiktok
---

## 1. Problem Description

Two memory sticks with `memory1` and `memory2` bytes. At second `i`, allocate `i` bytes from the stick with more memory (ties go to stick 1). Return the crash second and remaining memory.

## 2. Examples

**Example 1:**
```
Input: memory1 = 2, memory2 = 1
Output: [2, 0, 0]
Explanation:
- Second 1: allocate 1 byte from stick1 (memory1=1, memory2=1)
- Second 2: tie → allocate from stick1 (memory1=0, memory2=1)
- Second 3: cannot allocate 3 bytes, crash at second 2, remaining [0,0]
```

**Example 2:**
```
Input: memory1 = 8, memory2 = 11
Output: [5, 0, 1]
Explanation:
Allocate sequentially until second 5, then stick1 runs out, stick2 has 1 byte left.
```

## 3. Approach: Simulation — O(√n) ✅

```text
FUNCTION memLeak(memory1, memory2):
    SET i ← 1
    WHILE i ≤ MAX(memory1, memory2) DO
        IF memory1 ≥ memory2:
            SET memory1 ← memory1 - i
        ELSE:
            SET memory2 ← memory2 - i
        SET i ← i + 1
    RETURN [i, memory1, memory2]
```

## 4. Walkthrough

| Step | i | memory1 | memory2 | Action |
|------|---|---------|---------|--------|
| 1 | 1 | 2 → 1 | 1 | Allocate from stick1 (larger) |
| 2 | 2 | 1 → -1 | 1 | Tie → allocate from stick1, now memory1=0 |
| 3 | 3 | 0 | 1 | Cannot allocate 3 bytes, stop |

The function returns `[2, 0, 0]` for the first example.

## 5. Complexity Analysis

- **Time:** O(√n) because the loop runs until the sum 1+2+...+t exceeds the larger memory, and t ≈ √(2·max(memory)).
- **Space:** O(1) – only a few scalar variables.

## 6. Follow-Up Questions

- How would you modify the algorithm to return the exact second when both sticks run out simultaneously?
- Can you compute the result without simulation using a closed‑form formula?
- What if allocation amounts follow a different arithmetic progression?

## Key Takeaway

> Simulate allocation greedily. Since we allocate 1+2+...+t ≈ t²/2 total, crash happens at t ≈ √(2n), so O(√n) iterations.
