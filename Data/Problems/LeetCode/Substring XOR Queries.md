# 2564. Substring XOR Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/substring-xor-queries](https://leetcode.com/problems/substring-xor-queries)
**Companies:** Trilogy

---

## Problem Description

You are given a **binary string** `s`, and a **2D** integer array `queries` where `queries[i] = [first_i, second_i]`.

For the `i`th query, find the **shortest substring** of `s` whose **decimal value**, `val`, yields `second_i` when **bitwise XORed** with `first_i`. In other words, `val ^ first_i == second_i`.

The answer to the `i`th query is the endpoints (**0-indexed**) of the substring `[left_i, right_i]` or `[-1, -1]` if no such substring exists. If there are multiple answers, choose the one with the **minimum** `left_i`.

*Return an array* `ans` *where* `ans[i] = [left_i, right_i]` *is the answer to the* `i`th *query.*

A **substring** is a contiguous non-empty sequence of characters within a string.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= queries.length <= 10^5`
- `0 <= first_i, second_i <= 10^9`

## Examples

**Example 1:**
```
Input: s = "101101", queries = [[0,5],[1,2]]
Output: [[0,2],[2,3]]
Explanation: For the first query the substring in range [0,2] is "101" which has a decimal value of 5, and 5 ^ 0 = 5, hence the answer to the first query is [0,2]. In the second query, the substring in range [2,3] is "11", and has a decimal value of 3, and 3 ^ 1 = 2. So, [2,3] is returned for the second query.
```

**Example 2:**
```
Input: s = "0101", queries = [[12,8]]
Output: [[-1,-1]]
Explanation: In this example there is no substring that answers the query, hence [-1,-1] is returned.
```

**Example 3:**
```
Input: s = "1", queries = [[4,5]]
Output: [[0,0]]
Explanation: For this example, the substring in range [0,0] has a decimal value of 1, and 1 ^ 4 = 5. So, the answer is [0,0].
```

## Approach
Pre-compute all possible substring values up to length 30 (since 2³⁰ > 10⁹, the max query value). Store for each value the smallest interval (start, end). Then answer each query by checking if `first XOR second` exists in the map.

```text
FUNCTION SubstringXOR(s, queries):
    SET maxLen ← 30
    SET valueMap ← empty hash map   // value -> (start, end)
    SET n ← LENGTH(s)
    FOR i FROM 0 TO n-1:
        SET val ← 0
        FOR j FROM i TO MIN(i+maxLen-1, n-1):
            SET val ← (val << 1) OR (s[j] - '0')
            IF val NOT IN valueMap:
                SET valueMap[val] ← (i, j)
    SET results ← empty list
    FOR each [first, second] IN queries:
        SET target ← first XOR second
        IF target IN valueMap:
            APPEND valueMap[target] TO results
        ELSE:
            APPEND (-1, -1) TO results
    RETURN results
```

## Walkthrough
| i | j | Substring | Binary | Value | Stored? |
|---|---|-----------|--------|-------|---------|
| 0 | 0 | "1" | 1 | 1 | (0,0) |
| 0 | 1 | "10" | 2 | 2 | (0,1) |
| ... | ... | ... | ... | ... | ... |
After building the map, a query `[5,2]` computes `target = 5 XOR 2 = 7`; look up `7` → interval `(1,3)` etc.

## Complexity Analysis
- **Time:** O(n · L) where `L = 30` is the max substring length considered.
- **Space:** O(n · L) for storing at most `n·L` distinct values (bounded by ~30 n).

## Follow-Up Questions
- How would you handle queries where the required substring length could be larger than 30?
- Can the preprocessing be optimized to use a rolling hash instead of explicit binary conversion?
- What changes are needed if the string contains characters other than `0` and `1`?

## Key Takeaway
Limiting substring length to 30 bits keeps the search space small, allowing pre-computation of all possible values for constant-time query answers.
