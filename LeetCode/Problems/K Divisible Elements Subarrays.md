# 2261. K Divisible Elements Subarrays

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Turing, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate + Hash Set — O(n²) ✅](#4-approach-enumerate--hash-set--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and two integers `k` and `p`, return the number of **distinct** subarrays that contain **at most** `k` elements divisible by `p`.

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i], p, k <= 200`

---

## 2. Examples

```
Input: nums = [2,3,3,2,2], k = 2, p = 2
Output: 11

Input: nums = [1,2,3,4], k = 4, p = 1
Output: 10 (all subarrays are valid)
```

---

## 3. Key Insight

With n ≤ 200, enumerate all O(n²) subarrays. Track divisible count incrementally. Use a **set of tuples** to ensure distinctness. The small constraint makes this brute-force approach efficient enough.

---

## 4. Approach: Enumerate + Hash Set — O(n²) ✅

```
FUNCTION countDistinct(nums, k, p):
    seen = set()
    FOR i ← 0 TO len(nums) - 1:
        count = 0
        FOR j ← i TO len(nums) - 1:
            IF nums[j] % p == 0: count += 1
            IF count > k: BREAK
            seen.ADD(tuple(nums[i:j+1]))
    RETURN len(seen)
```

---

## 5. Walkthrough

```
nums = [2,3,3,2,2], k = 2, p = 2
```

Starting at i=0: subarrays [2], [2,3], [2,3,3], [2,3,3,2] (2 divs), [2,3,3,2,2] would be 3 divs → BREAK.
Starting at i=1: [3], [3,3], [3,3,2], [3,3,2,2] (2 divs).
... and so on. Deduplicate with the set.

**Result:** 11 distinct subarrays ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n³) | O(n²) subarrays × O(n) for tuple hashing |
| Space | O(n³) | Set of tuples in worst case |

---

## 7. Key Takeaway

> With n ≤ 200, brute-force enumeration of all subarrays with a hash set for deduplication is perfectly fine. For larger n, consider a trie or rolling hash for deduplication.
