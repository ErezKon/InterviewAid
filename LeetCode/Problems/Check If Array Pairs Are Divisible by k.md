# 1497. Check If Array Pairs Are Divisible by k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k)
**Companies:** 6Sense, Amazon, Devrev, Google, Meta, Microsoft, Tcs, Visa

---

```
FUNCTION canArrange(arr, k):
    count = [0] * k
    FOR num IN arr:
        count[((num % k) + k) % k] += 1

    IF count[0] % 2 != 0: RETURN false
    FOR i ← 1 TO k / 2:
        IF count[i] != count[k - i]: RETURN false

    RETURN true
```

Remainder r pairs with remainder k-r. Handle r=0 and r=k/2 (even k) separately.
