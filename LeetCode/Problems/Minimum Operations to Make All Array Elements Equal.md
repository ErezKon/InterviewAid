# 2602. Minimum Operations to Make All Array Elements Equal

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Jpmorgan
---

```
FUNCTION minOperations(nums, queries):
    SORT nums; prefix = prefix sums
    result = []
    FOR q IN queries:
        idx = bisect_left(nums, q)
        leftCost = q * idx - prefix[idx]
        rightCost = (prefix[n] - prefix[idx]) - q * (n - idx)
        result.ADD(leftCost + rightCost)
    RETURN result
```
