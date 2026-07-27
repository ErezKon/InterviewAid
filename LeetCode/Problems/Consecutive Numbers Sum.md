# 829. Consecutive Numbers Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/consecutive-numbers-sum](https://leetcode.com/problems/consecutive-numbers-sum)
**Companies:** Airbnb, Amazon, De Shaw, Google, Microsoft, Oracle, Tiktok, Zoho

---

## Approach: Math — O(√n) ✅

```
FUNCTION consecutiveNumbersSum(n):
    count = 0
    k = 1
    WHILE k * (k - 1) / 2 < n:
        IF (n - k * (k - 1) / 2) % k == 0:
            count += 1
        k += 1
    RETURN count
```

Sum of k consecutive starting from x: `k*x + k*(k-1)/2 = n`. So `x = (n - k*(k-1)/2) / k` must be a positive integer.
