# 2540. Minimum Common Value

**Difficulty:** 🟢 Easy

**Companies:** Bloomberg, Google, Microsoft
---

## Key Insight

> Both arrays are sorted. Use **two pointers** — advance the smaller pointer until they match or one array is exhausted.

---

## Approach: Two Pointers — O(n + m) ✅

```
FUNCTION getCommon(nums1, nums2):
    i ← 0, j ← 0
    WHILE i < LEN(nums1) AND j < LEN(nums2) DO
        IF nums1[i] = nums2[j] THEN RETURN nums1[i]
        IF nums1[i] < nums2[j] THEN i ← i + 1
        ELSE j ← j + 1
    RETURN -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two pointers | **O(n + m)** | **O(1)** |

---

## Key Takeaway

> **Merge-like scan on sorted arrays** — advance the smaller pointer to find the first common element efficiently.

---
