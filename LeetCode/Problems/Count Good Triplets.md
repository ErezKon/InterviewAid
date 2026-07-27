# 1534. Count Good Triplets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-good-triplets](https://leetcode.com/problems/count-good-triplets)
**Companies:** Amazon, Bloomberg, Google, Meta, Turvo

---

```
FUNCTION countGoodTriplets(arr, a, b, c):
    count = 0
    FOR i ← 0 TO n - 3:
        FOR j ← i + 1 TO n - 2:
            IF ABS(arr[i] - arr[j]) > a: CONTINUE
            FOR k ← j + 1 TO n - 1:
                IF ABS(arr[j] - arr[k]) <= b AND ABS(arr[i] - arr[k]) <= c:
                    count += 1
    RETURN count
```
