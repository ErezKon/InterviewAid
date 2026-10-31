# 1362. Closest Divisors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-divisors](https://leetcode.com/problems/closest-divisors)
**Companies:** Amazon

---

## 1. Problem Description

Given an integer `num`, find the closest two integers in absolute difference whose product equals `num + 1` or `num + 2`.

Return the two integers in any order.

**Constraints:**
- `1 <= num <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: num = 8
  Output: [3,3]
  Explanation: For num + 1 = 9, the closest divisors are 3 & 3, for num + 2 = 10, the closest divisors are 2 & 5, hence 3 & 3 is chosen.
```

```
Example 2:
  Input: num = 123
  Output: [5,25]
```

```
Example 3:
  Input: num = 999
  Output: [40,25]
```

---

## 3. Approach: Sqrt Scan — O(√n) ✅

```text
FUNCTION closestDivisors(num):
    bestPair ← [1, num + 1]
    FOR candidate IN [num + 1, num + 2]:
        // start from sqrt(candidate) and move downwards
        FOR i ← FLOOR(SQRT(candidate)) DOWNTO 1:
            IF candidate MOD i == 0:
                j ← candidate / i
                // update if this pair is closer than current best
                IF ABS(j - i) < ABS(bestPair[1] - bestPair[0]):
                    bestPair ← [i, j]
                BREAK   // first divisor gives the closest pair for this candidate
    RETURN bestPair
```

---

## 4. Walkthrough (Example 2)
| Step | candidate | i (decreasing) | divisor found? | pair | bestPair update |
|------|-----------|----------------|----------------|------|-----------------|
| 1 | 14 | 3 | 14 % 3 ≠ 0 | — | — |
| 2 | 14 | 2 | 14 % 2 = 0 | (2,7) | bestPair ← (2,7) |
| 3 | 13 | 3 | 13 % 3 ≠ 0 | — | — |
| 4 | 13 | 2 | 13 % 2 ≠ 0 | — | — |
| 5 | 13 | 1 | divisor 1 → (1,13) but diff 12 > 5, so keep (2,7)
The scan stops after the first divisor for each candidate because any smaller divisor would increase the difference.

---

## 5. Complexity Analysis
| Aspect | Complexity |
|--------|------------|
| Time   | O(√(num)) – we scan down from √(num+2) for each of the two candidates. |
| Space  | O(1) – only constant extra variables are used. |

---

## 6. Follow-Up Questions
- How would you adapt the algorithm if you needed the pair whose product is exactly `num + k` for a larger `k`?
- Can you solve the problem without scanning from √n by using prime factorization?
- What changes are needed if the numbers can be up to 10¹⁸ (requiring 64-bit arithmetic)?

---

## Key Takeaway

> To find the closest factor pair of a number, iterate downward from `√n` — the first divisor found gives the tightest pair.
