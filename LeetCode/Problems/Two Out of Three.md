# 2032. Two Out of Three

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Bookingcom, Info Edge
---

```
FUNCTION twoOutOfThree(nums1, nums2, nums3):
    s1, s2, s3 = SET(nums1), SET(nums2), SET(nums3)
    RETURN list((s1&s2) | (s1&s3) | (s2&s3))
```
