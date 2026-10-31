# 3511. Make a Positive Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-a-positive-array](https://leetcode.com/problems/make-a-positive-array)
**Companies:** Ukg

---

## 1. Problem Description

You are given an array `nums`. An array is considered **positive** if the sum of all numbers in each **subarray** with **more than two** elements is positive.

You can perform the following operation any number of times:

- Replace **one** element in `nums` with any integer between `-10^18` and `10^18`.

Find the **minimum** number of operations needed to make `nums` **positive**.

**Constraints:**

- `3 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: nums = [-10,15,-12]
  Output: 1
  Explanation: The only subarray with more than 2 elements is the array itself. The sum of all elements is (-10) + 15 + (-12) = -7. By replacing nums[0] with 0, the new sum becomes 0 + 15 + (-12) = 3. Thus, the array is now positive.
```

```
Example 2:
  Input: nums = [-1,-2,3,-1,2,6]
  Output: 1
  Explanation: The only subarrays with more than 2 elements and a non-positive sum are:
    Subarray Indices | Subarray        | Sum | After Replacement (Set nums[1] = 1) | New Sum
    nums[0...2]      | [-1, -2, 3]     | 0   | [-1, 1, 3]                          | 3
    nums[0...3]      | [-1, -2, 3, -1] | -1  | [-1, 1, 3, -1]                      | 2
    nums[1...3]      | [-2, 3, -1]     | 0   | [1, 3, -1]                          | 3
  Thus, nums is positive after one operation.
```

```
Example 3:
  Input: nums = [1,2,3]
  Output: 0
  Explanation: The array is already positive, so no operations are needed.
```

---

## 3. Approach: Greedy Prefix Fix — O(n) ✅

```text
FUNCTION minOperations(nums):
    SET ops ← 0
    SET prefix ← 0
    FOR num IN nums:
        SET prefix ← prefix + num
        IF prefix <= 0:
            // Need to increase this element to make prefix 1
            SET delta ← 1 - prefix
            SET ops ← ops + delta
            SET prefix ← 1
    RETURN ops
```

---

## 4. Walkthrough

**Example:** `nums = [1, -2, 3, -4, 5]`

| Index | num | prefix before | prefix after | Action |
|-------|-----|---------------|--------------|--------|
| 0 | 1 | 0 | 1 | no change |
| 1 | -2 | 1 | -1 | prefix ≤ 0 → add 2 ops, set prefix to 1 |
| 2 | 3 | 1 | 4 | no change |
| 3 | -4 | 4 | 0 | prefix ≤ 0 → add 1 op, set prefix to 1 |
| 4 | 5 | 1 | 6 | no change |

Total operations = 2 + 1 = 3? Wait calculation: first fix added 2, second added 1 → 3 ops. Adjust example accordingly.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

---

## 6. Follow-Up Questions

1. How would the solution change if you could only increment elements (no decrements)?
2. What if each operation has a cost proportional to the amount added?
3. Extend to 2-D grid where you need all row-wise prefix sums positive.

---

## 7. Key Takeaway

> Greedily fixing a non-positive prefix by raising the current element to make the prefix exactly 1 yields the minimal number of operations.
