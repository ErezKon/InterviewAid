# 41. First Missing Positive

**Difficulty:** 🔴 Hard
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/first-missing-positive](https://leetcode.com/problems/first-missing-positive)
**Companies:** Amazon, Apple, Bloomberg, Cognizant, Epam Systems, Flipkart, Geico, General Motors, Goldman Sachs, Google, Harness, Infosys, Makemytrip, Meta, Microsoft, Myntra, Netflix, Netskope, Nutanix, Oracle, Paypal, Phonepe, Salesforce, Servicenow, Siemens, Soundhound, Sprinklr, Swiggy, Tcs, Tesla, Walmart Labs, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Cyclic Sort / Index Marking — O(n) ✅](#3-approach-cyclic-sort--index-marking--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an unsorted integer array `nums`, return the **smallest positive integer** that is not present in `nums`.

You must implement an algorithm that runs in **O(n)** time and uses **O(1)** auxiliary space.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `-2³¹ <= nums[i] <= 2³¹ - 1`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,0]
  Output: 3

Example 2:
  Input:  nums = [3,4,-1,1]
  Output: 2

Example 3:
  Input:  nums = [7,8,9,11,12]
  Output: 1
```

---

## 3. Approach: Cyclic Sort / Index Marking — O(n) ✅

### Key Insight

The answer must be in `[1, n+1]` (where n = array length). We can use the array itself as a hash map: place value `v` at index `v-1`.

### Method 1: Cyclic Sort

```
FUNCTION firstMissingPositive(nums):
    n = len(nums)

    // Place each value at its "correct" index: value v → index v-1
    FOR i ← 0 TO n - 1:
        WHILE 1 <= nums[i] <= n AND nums[nums[i] - 1] != nums[i]:
            SWAP(nums[i], nums[nums[i] - 1])

    // Find the first index where the value doesn't match
    FOR i ← 0 TO n - 1:
        IF nums[i] != i + 1:
            RETURN i + 1

    RETURN n + 1
```

### Method 2: Index Marking

```
FUNCTION firstMissingPositive(nums):
    n = len(nums)

    // Step 1: Replace negatives and zeros and values > n with n+1
    FOR i ← 0 TO n - 1:
        IF nums[i] <= 0 OR nums[i] > n:
            nums[i] = n + 1

    // Step 2: For each value v in [1,n], mark index v-1 as negative
    FOR i ← 0 TO n - 1:
        val = ABS(nums[i])
        IF val <= n:
            nums[val - 1] = -ABS(nums[val - 1])

    // Step 3: First positive index + 1 is the answer
    FOR i ← 0 TO n - 1:
        IF nums[i] > 0:
            RETURN i + 1

    RETURN n + 1
```

---

## 4. Walkthrough

```
nums = [3, 4, -1, 1]   (n=4)

Cyclic Sort:
  i=0: nums[0]=3, swap with nums[2] → [-1,4,3,1]
       nums[0]=-1, not in [1,4], skip
  i=1: nums[1]=4, swap with nums[3] → [-1,1,3,4]
       nums[1]=1, swap with nums[0] → [1,-1,3,4]
       nums[1]=-1, not in [1,4], skip
  i=2: nums[2]=3, nums[2]=3 → already in place
  i=3: nums[3]=4, nums[3]=4 → already in place

Array: [1, -1, 3, 4]

Scan: i=0: 1==1✓, i=1: -1≠2 → RETURN 2 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each element swapped at most once |
| **Space** | O(1) auxiliary |

---

## 6. Follow-Up Questions

### 6.1 What if we can't modify the array?

Use O(n) space: a boolean array of size n+1 to mark present values. Or use a hash set.

### 6.2 Missing Number (LeetCode #268)?

Array contains `[0,n]` with one missing. Use XOR of all indices and values, or sum formula `n(n+1)/2 - sum(nums)`.

### 6.3 Find All Numbers Disappeared in an Array (LeetCode #448)?

Same index-marking technique. Mark `nums[|v|-1]` as negative. Indices with positive values are the missing numbers.

### 6.4 Find the Duplicate Number (LeetCode #287)?

Floyd's cycle detection on the array treated as a linked list: `next(i) = nums[i]`. O(n) time, O(1) space.

---

## Key Takeaway

> **Cyclic sort** (placing value v at index v-1) is the O(n)/O(1) technique for "find the missing/duplicate in [1,n]" problems. The key insight: with n slots, the answer to "first missing positive" must be in [1, n+1], so the array itself serves as a perfect hash table.
