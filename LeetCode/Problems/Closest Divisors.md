# 1362. Closest Divisors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-divisors](https://leetcode.com/problems/closest-divisors)
**Companies:** Amazon

---

## 1. Problem Description

Given an integer `num`, find two integers whose product is either `num + 1` or `num + 2`, and whose absolute difference is minimized. Return them as a pair.

---

## 2. Key Insight

> The closest pair of divisors of a number `n` is found near `√n`. Check both `num + 1` and `num + 2`, scanning down from the square root.

---

## 3. Approach: Sqrt Scan — O(√n) ✅

```
FUNCTION closestDivisors(num):
    FOR n IN [num + 2, num + 1]:  // prefer num+2 first (might have closer pair)
        FOR i FROM floor(sqrt(n)) DOWN TO 1:
            IF n % i == 0:
                RETURN [i, n / i]
```

Actually check both and return the pair with smaller difference:

```
FUNCTION closestDivisors(num):
    best = [1, num + 1]
    FOR n IN [num + 1, num + 2]:
        FOR i FROM floor(sqrt(n)) DOWN TO 1:
            IF n % i == 0:
                IF n/i - i < best[1] - best[0]:
                    best = [i, n / i]
                BREAK
    RETURN best
```

| Time | Space |
|------|-------|
| O(√n) | O(1) |

---

## Key Takeaway

> To find the closest factor pair of a number, iterate downward from `√n` — the first divisor found gives the tightest pair.
