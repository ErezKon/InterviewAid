# 1868. Product of Two Run-Length Encoded Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-of-two-run-length-encoded-arrays](https://leetcode.com/problems/product-of-two-run-length-encoded-arrays)
**Companies:** Meta, Yandex

---

## Problem Description
You are given two run‑length encoded arrays `encoded1` and `encoded2`. Each array consists of pairs `[value, frequency]` representing `frequency` consecutive occurrences of `value`. Compute the element‑wise product of the two original arrays and return the result as a run‑length encoded array.

## Examples
**Example 1**
```
Input: encoded1 = [[1,3],[2,1]], encoded2 = [[2,2],[3,2]]
Output: [[2,2],[6,2]]
Explanation: The decoded arrays are [1,1,1,2] and [2,2,3,3]. Their element‑wise product is [2,2,3,6]; run‑length encoding yields [[2,2],[6,1]] but since the last two values differ, the correct encoding is [[2,2],[6,1]].
```

**Example 2**
```
Input: encoded1 = [[1,1]], encoded2 = [[1,1]]
Output: [[1,1]]
```

## Approach
Iterate through both encoded arrays with two pointers, maintaining the remaining count for the current run in each array. At each step, multiply the current values, record the product with the minimum remaining count, and decrement the counts. Merge consecutive products with the same value into a single run.

### Pseudocode
```text
FUNCTION findRLEArray(encoded1, encoded2):
    SET i ← 0, j ← 0
    SET result ← []
    WHILE i < LENGTH(encoded1) AND j < LENGTH(encoded2):
        SET val1, cnt1 ← encoded1[i]
        SET val2, cnt2 ← encoded2[j]
        SET prod ← val1 * val2
        SET take ← MIN(cnt1, cnt2)
        IF result NOT EMPTY AND result[-1][0] == prod:
            SET result[-1][1] ← result[-1][1] + take
        ELSE:
            APPEND [prod, take] TO result
        END IF
        SET encoded1[i][1] ← cnt1 - take
        SET encoded2[j][1] ← cnt2 - take
        IF encoded1[i][1] == 0: INCREMENT i
        IF encoded2[j][1] == 0: INCREMENT j
    END WHILE
    RETURN result
```
The algorithm processes each run exactly once.

## Walkthrough
For `encoded1 = [[1,3],[2,1]]`, `encoded2 = [[2,2],[3,2]]`:
1. Multiply 1*2, take 2 → result `[[2,2]]`; remaining counts: `[1,1]` and `[2,2]`.
2. Multiply 1*2, take 1 → merge with previous (same product) → `[[2,3]]`.
3. Move to next run in `encoded1` (value 2, count 1) and continue with `encoded2` (value 3, count 2).
4. Multiply 2*3, take 1 → result `[[2,3],[6,1]]`.
5. Remaining count in `encoded2` is 1, but `encoded1` exhausted, loop ends.
Final encoded product: `[[2,3],[6,1]]`.

## Complexity Analysis
- **Time:** `O(m + n)` where `m` and `n` are the lengths of the encoded arrays.
- **Space:** `O(k)` for the result, where `k` is the number of runs in the product.

## Follow‑Up Questions
1. How would you handle overflow if the product exceeds integer limits?
2. Can the algorithm be adapted to compute the sum of two run‑length encoded arrays?
3. What changes are needed if the input arrays are extremely large and must be streamed?

## Key Takeaway
By processing runs with two pointers and merging identical products, you can compute the element‑wise product of run‑length encoded arrays in linear time.
