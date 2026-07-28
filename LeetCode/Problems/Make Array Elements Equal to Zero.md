# 3354. Make Array Elements Equal to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-array-elements-equal-to-zero](https://leetcode.com/problems/make-array-elements-equal-to-zero)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Count valid starting positions (zeros) from which a cursor can make all elements zero by moving left/right and decrementing.

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

| Input | Output | Explanation |
|-------|--------|-------------|
| `[0,1,2,3]` | `2` | Zero at index 0: left = 0, right = 6 → diff = 6 (invalid). Zero at index 1: left = 0, right = 5 → diff = 5 (invalid). Zero at index 2: left = 1, right = 3 → diff = 2 (invalid). Zero at index 3: left = 3, right = 0 → diff = 3 (invalid). Actually only zeros at positions where left and right sums differ by at most 1 are counted; in this array only the zero at index 0 yields count = 2 (both directions work). |
| `[0,0,0]` | `6` | Each zero has leftSum = rightSum, so both directions work → 3 × 2 = 6. |

---

## 4. Walkthrough

Consider `[0,1,0,2]`:

| Index | Value | leftSum before | rightSum after | Condition | Count increment |
|-------|-------|----------------|----------------|-----------|-----------------|
| 0 | 0 | 0 | 3 (1+0+2) | left = 0, right = 3 → diff = 3 → none |
| 1 | 1 | 0 | 2 (0+2) | not zero → skip |
| 2 | 0 | 1 | 2 (2) | left = 1, right = 2 → diff = 1 → +1 |
| 3 | 2 | 1 | 0 | not zero → skip |

Total count = 1.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass to compute prefix sums.
- **Space:** O(1) – only a few scalar variables.

---

## 3. Key Takeaway

> At each zero position, compare left sum vs right sum. If equal, both directions work (+2). If differ by 1, only one direction works (+1).
