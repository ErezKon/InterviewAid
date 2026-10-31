# 370. Range Addition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-addition](https://leetcode.com/problems/range-addition)
**Companies:** Amazon, Google, Salesforce
---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer `length` and an array `updates` where `updates[i] = [startIdx_i, endIdx_i, inc_i]`.

You have an array `arr` of length `length` with all zeros, and you have some operation to apply on `arr`. In the `i^th` operation, you should increment all the elements `arr[startIdx_i], arr[startIdx_i + 1], ..., arr[endIdx_i]` by `inc_i`.

Return `arr` *after applying all the* `updates`.

**Constraints:**
- `1 <= length <= 10^5`
- `0 <= updates.length <= 10^4`
- `0 <= startIdx_i <= endIdx_i < length`
- `-1000 <= inc_i <= 1000`

## Examples

**Example 1:**
```
Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]
```

**Example 2:**
```
Input: length = 10, updates = [[2,4,6],[5,6,8],[1,9,-4]]
Output: [0,-4,2,2,2,4,4,-4,-4,-4]
```

## Approach
Use a difference array to record the net change at each index. For each update, add `inc` at `start` and subtract `inc` at `end+1` (if within bounds). Finally compute the prefix sum of the difference array to obtain the resulting values.

```text
FUNCTION getModifiedArray(length, updates):
    SET diff ← ARRAY of zeros with size length
    FOR each upd IN updates:
        SET start ← upd[0]
        SET end ← upd[1]
        SET inc ← upd[2]
        SET diff[start] ← diff[start] + inc
        IF end + 1 < length:
            SET diff[end + 1] ← diff[end + 1] - inc
        END IF
    END FOR
    // Convert to final array via prefix sum
    SET result ← ARRAY of zeros with size length
    SET running ← 0
    FOR i ← 0 TO length - 1:
        SET running ← running + diff[i]
        SET result[i] ← running
    END FOR
    RETURN result
END FUNCTION
```

## Walkthrough
| Step | Action | diff array | running sum | result |
|------|--------|------------|-------------|--------|
|Init| – | `[0,0,0,0,0]` | 0 | `[0,0,0,0,0]` |
|[1,3,2]| diff[1]+=2, diff[4]-=2 | `[0,2,0,0,-2]` | – | – |
|[2,4,3]| diff[2]+=3, diff[5] out of bounds | `[0,2,3,0,-2]` | – | – |
|[0,2,1]| diff[0]+=1, diff[3]-=1 | `[1,2,3,-1,-2]` | – | – |
|Prefix sum| – | – | 1 → 3 → 6 → 5 → 3 | `[1,3,6,5,3]` |

## Complexity Analysis
- Time: O(length + k) where k is number of updates.
- Space: O(length) for the difference array.

## Follow-Up Questions
1. How would you support range queries (sum of a sub-array) in addition to updates?
2. Can the technique be extended to two-dimensional matrices?
3. What if updates can be both increments and decrements with large values?

## Key Takeaway
A difference array converts range-update problems into point-update operations, enabling O(1) updates and O(n) final reconstruction via a prefix sum.
