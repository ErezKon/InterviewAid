# 2540. Minimum Common Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-common-value](https://leetcode.com/problems/minimum-common-value)
**Companies:** Bloomberg, Google, Microsoft

---
## Problem Description
Given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, return *the **minimum integer common** to both arrays*. If there is no common integer amongst `nums1` and `nums2`, return `-1`.

Note that an integer is said to be **common** to `nums1` and `nums2` if both arrays have **at least one** occurrence of that integer.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10⁵`
- `1 <= nums1[i], nums2[j] <= 10⁹`
- Both `nums1` and `nums2` are sorted in **non-decreasing** order.

## Examples

```
Example 1:
  Input: nums1 = [1,2,3], nums2 = [2,4]
  Output: 2
  Explanation: The smallest element common to both arrays is 2, so we return 2.
```

```
Example 2:
  Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
  Output: 2
  Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.
```

## Approach
**Algorithm:** Two-Pointer Scan
Since both arrays are sorted, advance the pointer of the smaller value until the values match or one array ends.

```text
FUNCTION getCommon(nums1, nums2):
    i ← 0
    j ← 0
    WHILE i < LEN(nums1) AND j < LEN(nums2):
        IF nums1[i] = nums2[j]:
            RETURN nums1[i]
        ELSE IF nums1[i] < nums2[j]:
            i ← i + 1
        ELSE:
            j ← j + 1
    RETURN -1
```

## Walkthrough
For `nums1 = [1,2,3,4]`, `nums2 = [2,4,6]`:
- i=0 (1), j=0 (2) → 1 < 2, increment i.
- i=1 (2), j=0 (2) → match, return 2.
The algorithm stops at the first common element, which is the smallest due to sorted order.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n + m) where n and m are lengths of the arrays |
| Space  | O(1) |

## Follow-Up Questions
1. How would you modify the solution to return **all** common elements?
2. If the arrays were not sorted, what would be the optimal approach?
3. Can you solve the problem using a hash set with better average-case performance?

## Key Takeaway
A two-pointer scan of sorted arrays finds the smallest common value in linear time without extra space.
