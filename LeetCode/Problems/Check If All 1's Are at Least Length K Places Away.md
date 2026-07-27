# 1437. Check If All 1's Are at Least Length K Places Away

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away)
**Companies:** Bloomberg, Google, Meta

---

```
FUNCTION kLengthApart(nums, k):
    last = -k - 1
    FOR i, num IN enumerate(nums):
        IF num == 1:
            IF i - last - 1 < k: RETURN false
            last = i
    RETURN true
```
