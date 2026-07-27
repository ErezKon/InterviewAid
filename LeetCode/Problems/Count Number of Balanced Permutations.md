# 3343. Count Number of Balanced Permutations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-balanced-permutations](https://leetcode.com/problems/count-number-of-balanced-permutations)
**Companies:** Google, Meta

---

## 1. Problem Description

Given a string of digits, count permutations where the sum of digits at even indices equals the sum at odd indices. Return modulo 10^9+7.

---

## 2. Key Insight

> Total digit sum must be even (otherwise 0). Each half (even/odd positions) must sum to `totalSum / 2`. Use DP to count ways to assign digits to even positions achieving the target sum, then multiply by multinomial arrangements.

---

## 3. Approach: DP on Digit Assignment — O(n × S × n/2) ✅

```
FUNCTION countBalancedPermutations(num):
    digits = [int(d) for d in num]
    total = SUM(digits)
    IF total % 2 != 0: RETURN 0
    target = total // 2
    n = len(digits)
    evenSlots = (n + 1) // 2
    oddSlots = n // 2
    
    freq = Counter(digits)
    // DP: choose how many of each digit go to even positions
    // dp[sum][count] = ways to place digits achieving this sum with this count in even slots
    
    // Then multiply by multinomial coefficients for arrangement within even/odd slots
    ...
```

| Time | Space |
|------|-------|
| O(10 × target × evenSlots) | O(target × evenSlots) |

---

## Key Takeaway

> Balanced permutation = partition digits into two groups with equal sum. DP over digit frequencies to count valid partitions, then apply multinomial coefficients for arrangements.
