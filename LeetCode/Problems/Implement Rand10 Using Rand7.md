# 470. Implement Rand10() Using Rand7()

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-rand10-using-rand7](https://leetcode.com/problems/implement-rand10-using-rand7)
**Companies:** Bloomberg, De Shaw, Google, Linkedin, Microsoft, Tencent, Tiktok, Yandex
---

## 1. Problem Description

Implement `rand10()` using only `rand7()`. Each call must return a uniformly random integer in the range [1, 10].

---

## 2. Approach: Rejection Sampling — Expected O(1) ✅

Generate a uniform number in a larger range (1‑49) using two calls to `rand7()`. Accept numbers 1‑40 and map them to 1‑10; reject 41‑49 and retry.

```
FUNCTION rand10():
    WHILE true:
        // Uniform [1, 49]
        SET num ← (rand7() - 1) * 7 + rand7()
        IF num ≤ 40:
            RETURN (num - 1) % 10 + 1
```

---

## 3. Examples

| Calls to `rand7()` | Computed `num` | Result `rand10()` |
|--------------------|----------------|-------------------|
| 3, 5               | (3‑1)*7+5 = 19 |  (19‑1)%10+1 = 9 |
| 7, 2               | (7‑1)*7+2 = 44 → reject, repeat |
| 1, 4               | (1‑1)*7+4 = 4  |  (4‑1)%10+1 = 4 |

---

## 4. Walkthrough

1. Call `rand7()` twice → 3 and 5 → compute `num = 19` (≤40). Return `(19‑1)%10+1 = 9`.
2. If `num` had been 44 (>40), the loop repeats until an accepted value is produced.

---

## 5. Complexity Analysis

- **Time**: Expected O(1) calls to `rand7()` (rejection probability 9/49). Worst‑case unbounded but rare.
- **Space**: O(1).

---

## 6. Follow‑Up Questions

- How to generate `rand10()` using only `rand5()`?
- Can you reduce the expected number of `rand7()` calls?
- How to generate numbers in a different range efficiently?

---

## Key Takeaway

> **Rejection sampling**: create a larger uniform range, accept only values that map evenly to the target range, and retry on rejects. This yields an expected constant number of base random calls.
