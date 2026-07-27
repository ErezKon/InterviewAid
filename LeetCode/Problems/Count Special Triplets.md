# 3583. Count Special Triplets

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count triplets `(i, j, k)` where `i < j < k` and `nums[i] * nums[j] == nums[k]`. Return the total count.

**Constraints:**
- `3 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
- **Input:** `nums = [1, 2, 3, 6]`
- **Output:** `1`
- **Explanation:** (0,1,3): 1×2 = 2? No. (0,2,3): 1×3 = 3? No. (1,2,3): 2×3 = 6 ✅.

---

## Key Insight

Fix `k` as the right element. For each `k`, count how many pairs `(i, j)` with `i < j < k` have `nums[i] * nums[j] == nums[k]`. Use a hash map of products seen so far as you iterate `j`.

Alternatively, iterate pairs (i, j) and store their products in a hash map, then for each k, look up `nums[k]` in the map.

---

## Approach

```
FUNCTION countSpecialTriplets(nums):
    n = LENGTH(nums)
    count = 0
    productMap = HashMap()  // product → count of pairs with that product

    FOR j ← 1 TO n - 1 DO
        // Check if nums[j] matches any previous product
        // Wait — we need k > j, so check nums[j] as potential k
        // against products of pairs (i, prev_j) where prev_j < j
        count += productMap.get(nums[j], 0)

        // Add new products: pair current j with all i < j
        FOR i ← 0 TO j - 1 DO
            product = nums[i] * nums[j]
            productMap[product] += 1

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) — for each j, iterate all i < j |
| **Space** | O(n²) — hash map of products |

---

## Key Takeaway

> **For triplet counting with a product condition, build a hash map of pair products incrementally. For each new element, first check it as a potential match, then add its pairs to the map.**
