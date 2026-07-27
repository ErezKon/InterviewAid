
# 15. 3Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 39.1%
**LeetCode:** [https://leetcode.com/problems/3sum](https://leetcode.com/problems/3sum)
**Companies:** Accenture, Adobe, Agoda, Amazon, Amd, American Express, Apple, Autodesk, Bloomberg, Bny Mellon, Cisco, Cloudflare, Coupang, Deloitte, Dream11, Ebay, Epam Systems, Flipkart, Garena, Gojek, Goldman Sachs, Google, Goto, Hcl, Ibm, Infosys, Meesho, Meta, Microsoft, Morgan Stanley, Myntra, Nutanix, Nvidia, Oracle, Oyo, Paypal, Phonepe, Qualcomm, Roku, Salesforce, Samsung, Shipsy, Singlestore, Tcs, Tesla, Tiktok, Trexquant, Turing, Vimeo, Visa, Walmart Labs, Warnermedia, Wix, Works Applications, Zoho, Zomato, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n³)](#3-approach-1-brute-force--on³)
4. [Approach 2: Sort + Two Pointers — O(n²) ✅](#4-approach-2-sort--two-pointers--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Handling Duplicates](#6-handling-duplicates)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, return all the **triplets** `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

The solution set must not contain **duplicate** triplets.

---

## 2. Examples

```
Example 1:
  Input:  [-1, 0, 1, 2, -1, -4]
  Output: [[-1, -1, 2], [-1, 0, 1]]

Example 2:
  Input:  [0, 1, 1]
  Output: []

Example 3:
  Input:  [0, 0, 0]
  Output: [[0, 0, 0]]
```

---

## 3. Approach 1: Brute Force — O(n³)

Check every triple, use a set to avoid duplicates.

```
FUNCTION threeSumBrute(nums):
    SORT nums
    result = SET()
    FOR i ← 0 TO n - 3:
        FOR j ← i + 1 TO n - 2:
            FOR k ← j + 1 TO n - 1:
                IF nums[i] + nums[j] + nums[k] == 0:
                    result.ADD((nums[i], nums[j], nums[k]))
    RETURN LIST(result)
```

---

## 4. Approach 2: Sort + Two Pointers — O(n²) ✅

### Strategy

1. **Sort** the array.
2. Fix one element `nums[i]`.
3. Use **two pointers** on the remaining subarray to find pairs summing to `-nums[i]`.
4. **Skip duplicates** at every level.

```
FUNCTION threeSum(nums):
    SORT nums
    result = []

    FOR i ← 0 TO n - 3:

        // Skip duplicate values for the first element
        IF i > 0 AND nums[i] == nums[i-1]:
            CONTINUE

        // Early termination: if smallest possible triplet > 0
        IF nums[i] > 0:
            BREAK

        left  = i + 1
        right = n - 1
        target = -nums[i]

        WHILE left < right:
            sum = nums[left] + nums[right]

            IF sum == target:
                result.ADD([nums[i], nums[left], nums[right]])

                // Skip duplicates for left and right
                WHILE left < right AND nums[left] == nums[left + 1]:
                    left += 1
                WHILE left < right AND nums[right] == nums[right - 1]:
                    right -= 1

                left  += 1
                right -= 1

            ELSE IF sum < target:
                left += 1
            ELSE:
                right -= 1

    RETURN result
```

---

## 5. Walkthrough

```
nums = [-1, 0, 1, 2, -1, -4]
sorted = [-4, -1, -1, 0, 1, 2]

i=0: nums[0]=-4, target=4
  left=1, right=5: -1+2=1 < 4 → left=2
  left=2, right=5: -1+2=1 < 4 → left=3
  left=3, right=5: 0+2=2 < 4 → left=4
  left=4, right=5: 1+2=3 < 4 → left=5
  left >= right → done

i=1: nums[1]=-1, target=1
  left=2, right=5: -1+2=1 == 1 ✓ → add [-1,-1,2]
    skip dups: left=3, right=4
  left=3, right=4: 0+1=1 == 1 ✓ → add [-1,0,1]
    left=4, right=3 → done

i=2: nums[2]=-1 == nums[1]=-1 → SKIP (duplicate)

i=3: nums[3]=0 > 0? No. target=0
  left=4, right=5: 1+2=3 > 0 → right=4
  left >= right → done

Result: [[-1,-1,2], [-1,0,1]] ✅
```

---

## 6. Handling Duplicates

Three levels of duplicate skipping:

1. **Outer loop:** `if i > 0 and nums[i] == nums[i-1]: continue`
2. **Left pointer:** `while left < right and nums[left] == nums[left+1]: left++`
3. **Right pointer:** `while left < right and nums[right] == nums[right-1]: right--`

This guarantees no duplicate triplets without using a set.

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n³) | O(n) for dedup set |
| **Sort + Two Pointers** | **O(n²)** | **O(1)** (excluding output) |

---

## 8. Follow-Up Questions

### 8.1 3Sum Closest (LeetCode #16)

Find the triplet sum closest to `target`. Same structure, but track minimum difference:

```
FUNCTION threeSumClosest(nums, target):
    SORT nums
    closest = nums[0] + nums[1] + nums[2]

    FOR i ← 0 TO n - 3:
        left = i + 1, right = n - 1

        WHILE left < right:
            sum = nums[i] + nums[left] + nums[right]

            IF ABS(sum - target) < ABS(closest - target):
                closest = sum

            IF sum < target:
                left += 1
            ELSE IF sum > target:
                right -= 1
            ELSE:
                RETURN target

    RETURN closest
```

### 8.2 4Sum (LeetCode #18)

Fix two elements, use two pointers for the remaining pair. Time: O(n³).

### 8.3 k-Sum Generalization

Recursively reduce to 2Sum:

```
FUNCTION kSum(nums, target, k):
    IF k == 2:
        RETURN twoSumSorted(nums, target)

    results = []
    FOR i ← 0 TO LENGTH(nums) - k:
        IF i > 0 AND nums[i] == nums[i-1]: CONTINUE
        FOR sub IN kSum(nums[i+1:], target - nums[i], k - 1):
            results.ADD([nums[i]] + sub)
    RETURN results
```

**Time:** O(n^(k-1)) for k ≥ 2.

### 8.4 3Sum With Multiplicity (LeetCode #923)

Count the number of triplets (allowing same indices with same values). Needs combinatorial counting for duplicate values.

---

## Key Takeaway

> 3Sum = "fix one, two-pointer the rest." This reduction pattern (`k-sum → (k-1)-sum → ... → 2-sum`) is fundamental. The tricky part is **handling duplicates correctly** — always skip at every level after finding a match or advancing past the outer loop's fixed element.
