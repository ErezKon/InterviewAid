# 3875. Construct Uniform Parity Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-i](https://leetcode.com/problems/construct-uniform-parity-array-i)
**Companies:** Amdocs, Google

---

## 1. Problem Description

You are given an array `nums1` of `n` **distinct** integers.

You want to construct another array `nums2` of length `n` such that the elements in `nums2` are either **all odd or all even**.

For each index `i`, you must choose **exactly one** of the following (in any order):

- `nums2[i] = nums1[i]`
- `nums2[i] = nums1[i] - nums1[j]`, for an index `j != i`

Return `true` if it is possible to construct such an array, otherwise, return `false`.

**Constraints:**
- `1 <= n == nums1.length <= 100`
- `1 <= nums1[i] <= 100`
- `nums1` consists of distinct integers.

---

## 2. Examples

```
Example 1:
  Input: nums1 = [2,3]
  Output: true
  Explanation:
    - Choose nums2[0] = nums1[0] - nums1[1] = 2 - 3 = -1.
    - Choose nums2[1] = nums1[1] = 3.
    - nums2 = [-1, 3], and both elements are odd. Thus, the answer is true.
```
```
Example 2:
  Input: nums1 = [4,6]
  Output: true
  Explanation:
    - Choose nums2[0] = nums1[0] = 4.
    - Choose nums2[1] = nums1[1] = 6.
    - nums2 = [4, 6], and all elements are even. Thus, the answer is true.
```

---

## 3. Approach: Check Parity Feasibility — O(n) ✅

```text
FUNCTION canMakeUniformParity(nums, targetParity):
    // targetParity: 0 for even, 1 for odd
    FOR each num IN nums:
        IF (num MOD 2) ≠ targetParity:
            // One ±1 operation flips parity, so check if allowed by constraints
            IF NOT canFlip(num):
                RETURN false
    RETURN true

FUNCTION canFlip(num):
    // In this problem any element can be incremented or decremented by 1 exactly once
    RETURN true
```

---

## 4. Walkthrough

Consider `nums = [1,2,3]` with target parity **even**.

1. Check each element:
   - 1 is odd → can be incremented to 2.
   - 2 is already even.
   - 3 is odd → can be decremented to 2.
2. After applying the allowed ±1 changes, the array becomes `[2,2,2]`, all even.
3. Since every element could reach the target parity, return **true**.

---

## 5. Complexity Analysis

- **Time:** O(n) – a single pass over the array.
- **Space:** O(1) – only constant extra variables.

---

## 6. Follow-Up Questions

- How would the solution change if each element could be changed by any integer amount, not just ±1?
- What if the operation cost varies per element; can you minimize total cost to achieve uniform parity?
- How does the problem differ when the array is extremely large (e.g., streaming input) and you cannot store it entirely in memory?

---

## Key Takeaway

> Parity problems often reduce to counting: can all elements reach even (or odd) within the allowed operations?
