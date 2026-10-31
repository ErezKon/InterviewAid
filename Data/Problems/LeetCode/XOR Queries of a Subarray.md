# 1310. XOR Queries of a Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/xor-queries-of-a-subarray](https://leetcode.com/problems/xor-queries-of-a-subarray)
**Companies:** Airtel, Amazon, Bloomberg, Google

---

## Problem Description

You are given an array `arr` of positive integers. You are also given the array `queries` where `queries[i] = [left_i, right_i]`.

For each query `i` compute the **XOR** of elements from `left_i` to `right_i` (that is, `arr[left_i] XOR arr[left_i + 1] XOR ... XOR arr[right_i]` ).

Return an array `answer` where `answer[i]` is the answer to the `i^th` query.

**Constraints:**
- `1 <= arr.length, queries.length <= 3 * 10^4`
- `1 <= arr[i] <= 10^9`
- `queries[i].length == 2`
- `0 <= left_i <= right_i < arr.length`

## Examples

**Example 1:**
```
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8]
Explanation: The binary representation of the elements in the array are:
1 = 0001
3 = 0011
4 = 0100
8 = 1000
The XOR values for queries are:
[0,1] = 1 xor 3 = 2
[1,2] = 3 xor 4 = 7
[0,3] = 1 xor 3 xor 4 xor 8 = 14
[3,3] = 8
```

**Example 2:**
```
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]
```

## Approach
Use a **prefix XOR** array where `prefix[i]` stores XOR of `arr[0..i-1]`. The XOR of any subarray `[l, r]` is `prefix[r+1] ^ prefix[l]`. This allows answering each query in O(1) after an O(n) preprocessing step.

```text
FUNCTION xorQueries(arr, queries):
    // Build prefix XOR
    SET prefix ← [0]
    FOR num IN arr:
        SET last ← prefix[-1]
        APPEND (last ^ num) TO prefix
    // Answer queries
    SET results ← []
    FOR each (l, r) IN queries:
        SET ans ← prefix[r + 1] ^ prefix[l]
        APPEND ans TO results
    RETURN results
```

## Walkthrough
| Step | Action | prefix after step |
|------|--------|-------------------|
| Init | prefix = [0] | [0] |
| Add 1 | prefix.append(0 ^ 1) | [0,1] |
| Add 3 | prefix.append(1 ^ 3) | [0,1,2] |
| Add 4 | prefix.append(2 ^ 4) | [0,1,2,6] |
| Add 8 | prefix.append(6 ^ 8) | [0,1,2,6,14] |

Example 1 (`arr = [1,3,4,8]`), answering the queries:

| Query | prefix[r+1] ^ prefix[l] | ans |
|-------|-------------------------|-----|
| [0,1] | prefix[2] ^ prefix[0] = 2 ^ 0 | 2 |
| [1,2] | prefix[3] ^ prefix[1] = 6 ^ 1 | 7 |
| [0,3] | prefix[4] ^ prefix[0] = 14 ^ 0 | 14 |
| [3,3] | prefix[4] ^ prefix[3] = 14 ^ 6 | 8 |

**Output: [2,7,14,8]**. Example 2 builds prefix = [0,4,12,14,4] and yields [8,0,4,4].

## Complexity Analysis
- **Time:** O(n + q) where `n` is length of `arr` and `q` is number of queries.
- **Space:** O(n) for the prefix array.

## Follow-Up Questions
1. How would you handle updates to `arr` (e.g., changing an element) while still answering queries efficiently?
2. Can you extend this to support range XOR queries in a mutable array using a segment tree or binary indexed tree?
3. What if the queries ask for the maximum XOR subarray within a range?

## Key Takeaway
A prefix XOR array transforms each subarray XOR query into a constant-time operation, turning an O(n·q) problem into O(n+q).
