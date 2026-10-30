# 1868. Product of Two Run-Length Encoded Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-of-two-run-length-encoded-arrays](https://leetcode.com/problems/product-of-two-run-length-encoded-arrays)
**Companies:** Meta, Yandex

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

**Run-length encoding** is a compression algorithm that allows for an integer array `nums` with many segments of **consecutive repeated** numbers to be represented by a (generally smaller) 2D array `encoded`. Each `encoded[i] = [val_i, freq_i]` describes the `i`th segment of repeated numbers in `nums` where `val_i` is the value that is repeated `freq_i` times.

- For example, `nums = [1,1,1,2,2,2,2,2]` is represented by the **run-length encoded** array `encoded = [[1,3],[2,5]]`. Another way to read this is "three `1`'s followed by five `2`'s".

The **product** of two run-length encoded arrays `encoded1` and `encoded2` can be calculated using the following steps:

1. **Expand** both `encoded1` and `encoded2` into the full arrays `nums1` and `nums2` respectively.
2. Create a new array `prodNums` of length `nums1.length` and set `prodNums[i] = nums1[i] * nums2[i]`.
3. **Compress** `prodNums` into a run-length encoded array and return it.

You are given two **run-length encoded** arrays `encoded1` and `encoded2` representing full arrays `nums1` and `nums2` respectively. Both `nums1` and `nums2` have the **same length**. Each `encoded1[i] = [val_i, freq_i]` describes the `i`th segment of `nums1`, and each `encoded2[j] = [val_j, freq_j]` describes the `j`th segment of `nums2`.

Return *the **product** of* `encoded1` *and* `encoded2`.

**Note:** Compression should be done such that the run-length encoded array has the **minimum** possible length.

**Constraints:**
- `1 <= encoded1.length, encoded2.length <= 10^5`
- `encoded1[i].length == 2`
- `encoded2[j].length == 2`
- `1 <= val_i, freq_i <= 10^4` for each `encoded1[i]`.
- `1 <= val_j, freq_j <= 10^4` for each `encoded2[j]`.
- The full arrays that `encoded1` and `encoded2` represent are the same length.

## Examples

**Example 1:**
```
Input: encoded1 = [[1,3],[2,3]], encoded2 = [[6,3],[3,3]]
Output: [[6,6]]
Explanation: encoded1 expands to [1,1,1,2,2,2] and encoded2 expands to [6,6,6,3,3,3].
prodNums = [6,6,6,6,6,6], which is compressed into the run-length encoded array [[6,6]].
```

**Example 2:**
```
Input: encoded1 = [[1,3],[2,1],[3,2]], encoded2 = [[2,3],[3,3]]
Output: [[2,3],[6,1],[9,2]]
Explanation: encoded1 expands to [1,1,1,2,3,3] and encoded2 expands to [2,2,2,3,3,3].
prodNums = [2,2,2,6,9,9], which is compressed into the run-length encoded array [[2,3],[6,1],[9,2]].
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
