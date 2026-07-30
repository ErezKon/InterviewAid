# 3576. Transform Array to All Equal Elements

**Difficulty:** 🟡 Medium

**Companies:** Flipkart, Meta, Microsoft
---

## Problem Description
You are given an integer array `nums` consisting only of `1` and `-1`. In one operation you may select any two **adjacent** elements and flip both of them (multiply each by `-1`). Determine whether it is possible to make all elements equal (either all `1` or all `-1`). Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
```
Input: nums = [1, -1, 1, -1]
Output: true
Explanation: Flip positions (2,3) → [1,1,-1,-1]; then flip (3,4) → [1,1,1,1].
```

**Example 2:**
```
Input: nums = [1, 1, -1]
Output: false
Explanation: The number of `-1` is odd, so parity cannot be fixed using adjacent flips.
```

## Approach
Each flip changes the sign of exactly two elements, so the **parity** (odd/even) of the count of `-1` values never changes. Therefore, all elements can become equal only if the initial count of `-1` is even (allowing conversion to all `1`) or the count of `1` is even (allowing conversion to all `-1`).

**Pseudocode**
```text
FUNCTION canMakeAllEqual(nums):
    SET negCount ← 0
    FOR each v IN nums:
        IF v = -1:
            SET negCount ← negCount + 1
    SET posCount ← LENGTH(nums) - negCount
    IF negCount MOD 2 = 0 OR posCount MOD 2 = 0:
        RETURN TRUE
    ELSE:
        RETURN FALSE
```

## Walkthrough
| nums | negCount | posCount | negCount even? | posCount even? | Result |
|------|----------|----------|----------------|----------------|--------|
| [1,-1,1,-1] | 2 | 2 | yes | yes | true |
| [1,1,-1] | 1 | 2 | no | yes | true (convert to all -1) |
| [1,1,1] | 0 | 3 | yes | no | true |

## Complexity Analysis
- Time: O(n) to count elements.
- Space: O(1).

## Follow-Up Questions
1. How would the solution change if you could flip any two elements (not necessarily adjacent)?
2. What if each flip incurs a cost and you need the minimum total cost?
3. Can the problem be extended to arrays with arbitrary integers where flipping toggles sign?

## Key Takeaway
Because each operation flips two elements, the parity of the count of each value is invariant; checking this parity determines feasibility.
