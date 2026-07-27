# 2601. Prime Subtraction Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/prime-subtraction-operation](https://leetcode.com/problems/prime-subtraction-operation)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION primeSubOperation(nums):
    primes = sieve up to 1000
    FOR i ← 0 TO len(nums) - 1:
        target = nums[i] - (nums[i-1] + 1 IF i > 0 ELSE 1)
        // Find largest prime < nums[i] such that nums[i] - prime > prev
        FOR p IN reversed(primes):
            IF p < nums[i] AND (i == 0 OR nums[i] - p > nums[i-1]):
                nums[i] -= p; BREAK
        IF i > 0 AND nums[i] <= nums[i-1]: RETURN false
    RETURN true
```
