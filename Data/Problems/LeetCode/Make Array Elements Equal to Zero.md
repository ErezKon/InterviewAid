# 3354. Make Array Elements Equal to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-array-elements-equal-to-zero](https://leetcode.com/problems/make-array-elements-equal-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

You are given an integer array `nums`.

Start by selecting a starting position `curr` such that `nums[curr] == 0`, and choose a movement **direction** of either left or right.

After that, you repeat the following process:

- If `curr` is out of the range `[0, n - 1]`, this process ends.
- If `nums[curr] == 0`, move in the current direction by **incrementing** `curr` if you are moving right, or **decrementing** `curr` if you are moving left.
- Else if `nums[curr] > 0`:
  - Decrement `nums[curr]` by 1.
  - **Reverse** your movement direction (left becomes right and vice versa).
  - Take a step in your new direction.

A selection of the initial position `curr` and movement direction is considered **valid** if every element in `nums` becomes 0 by the end of the process.

Return the number of possible **valid** selections.

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`
- There is at least one element `i` where `nums[i] == 0`.

---

## 2. Approach: Prefix Sum Balance — O(n) ✅

```text
FUNCTION countValidSelections(nums):
    total ← SUM(nums)
    count ← 0
    leftSum ← 0
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] == 0:
            rightSum ← total - leftSum - nums[i]
            IF leftSum == rightSum:
                count ← count + 2
            ELSE IF ABS(leftSum - rightSum) == 1:
                count ← count + 1
        leftSum ← leftSum + nums[i]
    RETURN count
```

---

## 3. Examples

```
Example 1:
  Input: nums = [1,0,2,0,3]
  Output: 2
  Explanation: The only possible valid selections are the following:
  - Choose curr = 3, and a movement direction to the left.
    [1,0,2,(0),3] -> [1,0,(2),0,3] -> [1,0,1,(0),3] -> [1,0,1,0,(3)] -> [1,0,1,(0),2] ->
    [1,0,(1),0,2] -> [1,0,0,(0),2] -> [1,0,0,0,(2)] -> [1,0,0,(0),1] -> [1,0,(0),0,1] ->
    [1,(0),0,0,1] -> [(1),0,0,0,1] -> [0,(0),0,0,1] -> [0,0,(0),0,1] -> [0,0,0,(0),1] ->
    [0,0,0,0,(1)] -> [0,0,0,0,0]
  - Choose curr = 3, and a movement direction to the right.
    [1,0,2,(0),3] -> [1,0,2,0,(3)] -> [1,0,2,(0),2] -> [1,0,(2),0,2] -> [1,0,1,(0),2] ->
    [1,0,1,0,(2)] -> [1,0,1,(0),1] -> [1,0,(1),0,1] -> [1,0,0,(0),1] -> [1,0,0,0,(1)] ->
    [1,0,0,(0),0] -> [1,0,(0),0,0] -> [1,(0),0,0,0] -> [(1),0,0,0,0] -> [0,0,0,0,0]
  (parentheses mark the current position curr)
```

```
Example 2:
  Input: nums = [2,3,4,0,4,1,0]
  Output: 0
  Explanation: There are no possible valid selections.
```

---

## 4. Walkthrough

Consider `[0,1,0,2]`:

| Index | Value | leftSum before | rightSum after | Condition | Count increment |
|-------|-------|----------------|----------------|-----------|-----------------|
| 0 | 0 | 0 | 3 (1+0+2) | left = 0, right = 3 → diff = 3 → none |
| 1 | 1 | 0 | 2 (0+2) | not zero → skip |
| 2 | 0 | 1 | 2 (2) | left = 1, right = 2 → diff = 1 → +1 |
| 3 | 2 | 1 | 0 | not zero → skip |

Total count = 1.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass to compute prefix sums.
- **Space:** O(1) – only a few scalar variables.

---

## 3. Key Takeaway

> At each zero position, compare left sum vs right sum. If equal, both directions work (+2). If differ by 1, only one direction works (+1).
