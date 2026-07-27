# 2425. Bitwise XOR of All Pairings

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta, Trilogy
---

```
FUNCTION xorAllNums(nums1, nums2):
    result = 0
    IF len(nums2) % 2: result ^= XOR(nums1)
    IF len(nums1) % 2: result ^= XOR(nums2)
    RETURN result
```
