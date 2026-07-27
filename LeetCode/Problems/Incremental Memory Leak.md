# 1860. Incremental Memory Leak

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/incremental-memory-leak](https://leetcode.com/problems/incremental-memory-leak)
**Companies:** Tiktok

---

## 1. Problem Description

Two memory sticks with `memory1` and `memory2` bytes. At second `i`, allocate `i` bytes from the stick with more memory (ties go to stick 1). Return the crash second and remaining memory.

## 2. Approach: Simulation — O(√n) ✅

```
FUNCTION memLeak(memory1, memory2):
    i ← 1
    WHILE i <= MAX(memory1, memory2) DO
        IF memory1 >= memory2: memory1 -= i
        ELSE: memory2 -= i
        i += 1
    RETURN [i, memory1, memory2]
```

## Key Takeaway

> Simulate allocation greedily. Since we allocate 1+2+...+t ≈ t²/2 total, crash happens at t ≈ √(2n), so O(√n) iterations.
