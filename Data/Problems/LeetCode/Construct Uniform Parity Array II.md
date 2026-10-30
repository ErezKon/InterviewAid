# 3876. Construct Uniform Parity Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-ii](https://leetcode.com/problems/construct-uniform-parity-array-ii)
**Companies:** Amdocs

---

## 1. Problem Description

You are given an array `nums1` of `n` **distinct** integers.

You want to construct another array `nums2` of length `n` such that the elements in `nums2` are either **all odd or all even**.

For each index `i`, you must choose **exactly one** of the following (in any order):

- `nums2[i] = nums1[i]`
- `nums2[i] = nums1[i] - nums1[j]`, for an index `j != i`, such that `nums1[i] - nums1[j] >= 1`

Return `true` if it is possible to construct such an array, otherwise return `false`.

**Constraints:**
- `1 <= n == nums1.length <= 10^5`
- `1 <= nums1[i] <= 10^9`
- `nums1` consists of distinct integers.

---

## 2. Approach: Greedy / DP — O(n) ✅

```
FUNCTION minOperations(nums):
    // Try both target parities (all even, all odd)
    // For each, compute min total operations
    costEven = SUM(num % 2 for num in nums)       // cost to make all even
    costOdd = SUM((num + 1) % 2 for num in nums)  // cost to make all odd
    RETURN MIN(costEven, costOdd)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

```
Example 1:
  Input: nums1 = [1,4,7]
  Output: true
  Explanation:
    - Set nums2[0] = nums1[0] = 1.
    - Set nums2[1] = nums1[1] - nums1[0] = 4 - 1 = 3.
    - Set nums2[2] = nums1[2] = 7.
    - nums2 = [1, 3, 7], and all elements are odd. Thus, the answer is true.
```
```
Example 2:
  Input: nums1 = [2,3]
  Output: false
  Explanation: It is not possible to construct nums2 such that all elements have the same parity. Thus, the answer is false.
```
```
Example 3:
  Input: nums1 = [4,6]
  Output: true
  Explanation:
    - Set nums2[0] = nums1[0] = 4.
    - Set nums2[1] = nums1[1] = 6.
    - nums2 = [4, 6], and all elements are even. Thus, the answer is true.
```

---

## 4. Walkthrough

Consider `nums = [1,2,3,4]`.

| Index | Value | Parity (odd=1, even=0) |
|-------|-------|-----------------------|
| 0     | 1     | 1 |
| 1     | 2     | 0 |
| 2     | 3     | 1 |
| 3     | 4     | 0 |

- Cost to make all even = count of odd numbers = 2.
- Cost to make all odd  = count of even numbers = 2.
- Minimum = 2.

The algorithm simply counts odds and evens and returns the smaller count.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would the solution change if each operation could flip the parity of a *range* of elements?
- What if the cost to change an odd to even differs from even to odd?
- Can you extend the approach to handle multiple target parities (e.g., modulo 3)?

---

## Key Takeaway

> Changing parity costs 1 per element. Total cost = count of elements with wrong parity. Try both targets and take the minimum.
