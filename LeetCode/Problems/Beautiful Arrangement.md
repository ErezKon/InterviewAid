# 526. Beautiful Arrangement

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-arrangement](https://leetcode.com/problems/beautiful-arrangement)
**Companies:** Amazon, Bloomberg, Google, Hashedin, Microsoft, Visa

---

## Approach: Backtracking / Bitmask DP — O(2ⁿ·n) ✅

```
FUNCTION countArrangement(n):
    count = 0

    FUNCTION backtrack(pos, visited):
        IF pos > n:
            count += 1
            RETURN
        FOR num ← 1 TO n:
            IF num NOT IN visited AND (num % pos == 0 OR pos % num == 0):
                visited.ADD(num)
                backtrack(pos + 1, visited)
                visited.REMOVE(num)

    backtrack(1, set())
    RETURN count
```
