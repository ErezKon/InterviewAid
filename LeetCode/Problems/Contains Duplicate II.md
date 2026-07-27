# 219. Contains Duplicate II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/contains-duplicate-ii](https://leetcode.com/problems/contains-duplicate-ii)
**Companies:** Accenture, Adobe, Airbnb, Amazon, Apple, Arista Networks, Bloomberg, Google, Meta, Microsoft, Netflix, Palantir, Tcs, Zoho

---

## Approach: Sliding Window Set — O(n) ✅

```
FUNCTION containsNearbyDuplicate(nums, k):
    window = set()
    FOR i ← 0 TO n - 1:
        IF nums[i] IN window: RETURN true
        window.ADD(nums[i])
        IF len(window) > k:
            window.REMOVE(nums[i - k])
    RETURN false
```

Maintain a sliding window of size k. Check for duplicates within the window.
