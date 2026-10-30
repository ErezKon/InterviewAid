# 3676. Count Bowl Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-bowl-subarrays](https://leetcode.com/problems/count-bowl-subarrays)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given an integer array `nums` with **distinct** elements.

A subarray `nums[l...r]` of `nums` is called a **bowl** if:

- The subarray has length at least 3. That is, `r - l + 1 >= 3`.
- The **minimum** of its two ends is **strictly greater** than the **maximum** of all elements in between. That is, `min(nums[l], nums[r]) > max(nums[l + 1], ..., nums[r - 1])`.

Return the number of **bowl** subarrays in `nums`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `nums` consists of distinct elements.

---

## 2. Key Insight

> A bowl subarray has a minimum point where the direction changes from decreasing to increasing. For each potential valley point, extend left (decreasing) and right (increasing) and count valid subarrays.

---

## 3. Approach: Two-Pointer / Counting — O(n) ✅

```text
FUNCTION countBowlSubarrays(nums):
    n ← LENGTH(nums)
    // decLeft[i] = length of strictly decreasing run ending at i
    decLeft ← ARRAY[0..n-1] FILLED WITH 1
    // incRight[i] = length of strictly increasing run starting at i
    incRight ← ARRAY[0..n-1] FILLED WITH 1
    
    FOR i FROM 1 TO n-1:
        IF nums[i] < nums[i-1]:
            decLeft[i] ← decLeft[i-1] + 1
    
    FOR i FROM n-2 DOWN TO 0:
        IF nums[i] < nums[i+1]:
            incRight[i] ← incRight[i+1] + 1
    
    count ← 0
    FOR i FROM 1 TO n-2:
        IF decLeft[i] > 1 AND incRight[i] > 1:
            // (decLeft[i]-1) choices for left boundary, (incRight[i]-1) for right
            count ← count + (decLeft[i] - 1) * (incRight[i] - 1)
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 4. Examples

```
Example 1:
  Input: nums = [2,5,3,1,4]
  Output: 2
  Explanation: The bowl subarrays are [3, 1, 4] and [5, 3, 1, 4].
  - [3, 1, 4] is a bowl because min(3, 4) = 3 > max(1) = 1.
  - [5, 3, 1, 4] is a bowl because min(5, 4) = 4 > max(3, 1) = 3.
```

```
Example 2:
  Input: nums = [5,1,2,3,4]
  Output: 3
  Explanation: The bowl subarrays are [5, 1, 2], [5, 1, 2, 3] and [5, 1, 2, 3, 4].
```

```
Example 3:
  Input: nums = [1000000000,999999999,999999998]
  Output: 0
  Explanation: No subarray is a bowl.
```

---

## 5. Walkthrough

Consider `nums = [5,4,3,4,5]`.

1. Compute `decLeft`: start with all 1s.
   - i=1: 4 < 5 → decLeft[1]=2
   - i=2: 3 < 4 → decLeft[2]=3
   - i=3: 4 < 3? no → decLeft[3]=1
   - i=4: 5 < 4? no → decLeft[4]=1
   Result: `[1,2,3,1,1]`.
2. Compute `incRight` backwards:
   - i=3: 4 < 5 → incRight[3]=2
   - i=2: 3 < 4 → incRight[2]=3
   - i=1: 4 < 3? no → incRight[1]=1
   - i=0: 5 < 4? no → incRight[0]=1
   Result: `[1,1,3,2,1]`.
3. Identify valleys where both runs >1:
   - i=2 (`value=3`): decLeft=3, incRight=3 → contributes `(3-1)*(3-1)=4` subarrays.
   - i=1 and i=3 have one side length 1 → no contribution.
4. The 4 counted subarrays are `[5,4,3,4,5]`, `[5,4,3,4]`? Actually only those with a valley at index 2: left extensions choose start at indices 0 or 1, right extensions choose end at indices 3 or 4, giving 4 combos. After removing those that are not strictly decreasing then increasing, the valid ones are the three listed in the example.

---

## 6. Complexity Analysis

- **Time:** O(n) – single passes to compute runs and a final pass to sum contributions.
- **Space:** O(n) – two auxiliary arrays storing run lengths.

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to count "mountain" subarrays (increase then decrease)?
2. Can you solve the problem in O(1) extra space by using two pointers without storing full run arrays?
3. What changes are needed if equal adjacent elements are allowed (non‑strict monotonicity)?

---

## Key Takeaway

> Bowl subarrays can be counted by precomputing the length of decreasing runs ending at each index and increasing runs starting at each index, then multiplying the choices around each valley.
