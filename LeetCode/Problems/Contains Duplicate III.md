# 220. Contains Duplicate III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/contains-duplicate-iii](https://leetcode.com/problems/contains-duplicate-iii)
**Companies:** Airbnb, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Palantir

---

## Approach: Bucket Sort — O(n) ✅

```
FUNCTION containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff):
    IF valueDiff < 0: RETURN false
    buckets = {}
    w = valueDiff + 1

    FOR i, num IN enumerate(nums):
        bucket = num // w

        IF bucket IN buckets: RETURN true
        IF bucket - 1 IN buckets AND ABS(num - buckets[bucket-1]) < w: RETURN true
        IF bucket + 1 IN buckets AND ABS(num - buckets[bucket+1]) < w: RETURN true

        buckets[bucket] = num
        IF i >= indexDiff:
            DELETE buckets[nums[i - indexDiff] // w]

    RETURN false
```

Bucket width = valueDiff + 1. Same bucket → guaranteed close. Adjacent buckets → check distance.
