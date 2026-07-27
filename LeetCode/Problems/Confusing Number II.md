# 1088. Confusing Number II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/confusing-number-ii](https://leetcode.com/problems/confusing-number-ii)
**Companies:** Google

---

## 1. Problem Description

Count all confusing numbers in `[1, n]`. A confusing number uses only digits {0,1,6,8,9} and when rotated 180° produces a different number.

---

## 2. Key Insight

> Generate all numbers using only valid digits (0,1,6,8,9) up to `n` via DFS. For each, check if its rotation differs. Count of confusing = count of valid-digit numbers − count of non-confusing (strobogrammatic) numbers.

---

## 3. Approach: DFS Generation — O(5^d) ✅

```
FUNCTION confusingNumberII(n):
    validDigits = [0, 1, 6, 8, 9]
    rotateMap = {0:0, 1:1, 6:9, 8:8, 9:6}
    count = 0
    
    FUNCTION dfs(num, rotated, rotMul):
        // rotMul tracks the place value for building rotated number
        IF num != rotated:
            count += 1
        FOR d IN validDigits:
            next = num * 10 + d
            IF next > n OR next == 0: CONTINUE
            dfs(next, rotateMap[d] * rotMul + rotated, rotMul * 10)
    
    FOR d IN validDigits:
        IF d == 0: CONTINUE
        dfs(d, rotateMap[d], 10)
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(5^d) where d = digits of n | O(d) recursion |

---

## Key Takeaway

> Generate valid-digit numbers via DFS while simultaneously building the rotated value. Only count when original ≠ rotated. Much faster than checking every number up to n.
