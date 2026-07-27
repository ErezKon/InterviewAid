# 932. Beautiful Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-array](https://leetcode.com/problems/beautiful-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Approach: Divide and Conquer — O(n log n) ✅

```
FUNCTION beautifulArray(n):
    // No i < k < j with A[k]*2 = A[i]+A[j]
    // Key: if A is beautiful, 2*A and 2*A-1 are beautiful
    // Odds can't sum with evens to make even middle
    result = [1]
    WHILE len(result) < n:
        odds = [2*x - 1 for x in result if 2*x - 1 <= n]
        evens = [2*x for x in result if 2*x <= n]
        result = odds + evens
    RETURN result
```
