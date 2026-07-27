# 1752. Check if Array Is Sorted and Rotated

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-array-is-sorted-and-rotated](https://leetcode.com/problems/check-if-array-is-sorted-and-rotated)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Meta, Microsoft, Soundhound, Tcs, Visa

---

```
FUNCTION check(nums):
    inversions = 0
    FOR i ← 0 TO n - 1:
        IF nums[i] > nums[(i + 1) % n]:
            inversions += 1
    RETURN inversions <= 1
```

A sorted-and-rotated array has at most 1 "drop" (where next element is smaller). Check circularly.
