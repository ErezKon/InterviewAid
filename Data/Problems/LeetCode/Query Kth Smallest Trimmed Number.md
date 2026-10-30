# 2343. Query Kth Smallest Trimmed Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/query-kth-smallest-trimmed-number](https://leetcode.com/problems/query-kth-smallest-trimmed-number)
**Companies:** De Shaw

---

## Problem Description

You are given a **0-indexed** array of strings `nums`, where each string is of **equal length** and consists of only digits.

You are also given a **0-indexed** 2D integer array `queries` where `queries[i] = [k_i, trim_i]`. For each `queries[i]`, you need to:

- **Trim** each number in `nums` to its **rightmost** `trim_i` digits.
- Determine the **index** of the `k_i`th smallest trimmed number in `nums`. If two trimmed numbers are equal, the number with the **lower** index is considered to be smaller.
- Reset each number in `nums` to its original length.

Return *an array* `answer` *of the same length as* `queries`, *where* `answer[i]` *is the answer to the* `i`th *query.*

**Note**:

- To trim to the rightmost `x` digits means to keep removing the leftmost digit, until only `x` digits remain.
- Strings in `nums` may contain leading zeros.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i].length <= 100`
- `nums[i]` consists of only digits.
- All `nums[i].length` are **equal**.
- `1 <= queries.length <= 100`
- `queries[i].length == 2`
- `1 <= k_i <= nums.length`
- `1 <= trim_i <= nums[i].length`

**Follow up:** Could you use the **Radix Sort Algorithm** to solve this problem? What will be the complexity of that solution?

## Examples

**Example 1:**
```
Input: nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
Output: [2,2,1,0]
Explanation:
1. After trimming to the last digit, nums = ["2","3","1","4"]. The smallest number is 1 at index 2.
2. Trimmed to the last 3 digits, nums is unchanged. The 2nd smallest number is 251 at index 2.
3. Trimmed to the last 2 digits, nums = ["02","73","51","14"]. The 4th smallest number is 73 at index 1.
4. Trimmed to the last 2 digits, the smallest number is 2 at index 0.
   Note that the trimmed number "02" is evaluated as 2.
```

**Example 2:**
```
Input: nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
Output: [3,0]
Explanation:
1. Trimmed to the last digit, nums = ["4","7","6","4"]. The 2nd smallest number is 4 at index 3.
   There are two occurrences of 4, but the one at index 0 is considered smaller than the one at index 3.
2. Trimmed to the last 2 digits, nums is unchanged. The 2nd smallest number is 24 at index 0.
```

## Approach
For each query we independently:
1. Trim every string to its last `trim` characters.
2. Pair each trimmed string with its original index.
3. Sort the pairs lexicographically (string comparison works because all strings have equal length after trimming).
4. Return the original index of the element at position `k`.
The straightforward method runs in O(Q·(N log N)) where N = |nums| and Q = number of queries, which satisfies the constraints.

```text
FUNCTION queryKthSmallest(nums, queries):
    SET answers ← []
    FOR each q IN queries:
        SET k ← q[0]
        SET trim ← q[1]
        SET pairs ← []
        FOR i ← 0 TO LENGTH(nums) - 1:
            SET trimmed ← SUBSTRING(nums[i], LENGTH(nums[i]) - trim, trim)
            APPEND (trimmed, i + 1) TO pairs   // store 1‑based index
        SORT pairs BY first element (trimmed string) ASCENDING, THEN BY second ASCENDING
        APPEND pairs[k-1].second TO answers
    RETURN answers
```

## Walkthrough
| Query | Trimmed strings | Sorted (value,index) | k‑th element | Answer |
|-------|----------------|----------------------|--------------|--------|
| [1,1,2] | ["2","3","1","4"] | [("1",3),("2",1),("3",2),("4",4)] | 1st → ("1",3) | 3 |
| … | … | … | … | … |

## Complexity Analysis
- **Time:** For each query O(N log N) sorting → O(Q·N log N).
- **Space:** O(N) for the temporary trimmed list.

## Follow‑Up Questions
1. How would you answer all queries faster if `Q` is large? (Hint: sort queries by `trim` and reuse previous work.)
2. Can you handle the case where numbers have leading zeros after trimming?
3. How would you modify the algorithm to return the actual trimmed string instead of the original index?

## Key Takeaway
Trimming and sorting per query provides a clear solution; grouping queries by trim length can reduce redundant work.
